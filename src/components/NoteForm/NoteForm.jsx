import React, { useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import s from "./style.module.css";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { ValidatorService } from "utils/validator";
import FieldError from "components/FieldError/FieldError";
import { toast } from "utils/sweet-alert";

const VALIDATOR = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};

const NoteForm = ({
  isEditable = true,
  note,
  title,
  onClickEdit,
  onClickDelete,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState({
    title: note?.title || "",
    content: note?.content || "",
    img: note?.img || "",
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });

  const updateFormValues = (e) => {
    const name = e.currentTarget.getAttribute("name");
    const value = e.currentTarget.textContent;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validate(name, value);
  };

  const updateFormImage = (e) => {
    const fileExtension = e.target.files[0].name
      .split(".")
      .at(-1)
      .toLowerCase();
    if (["jpg", "png", "gif"].includes(fileExtension)) {
      setFormValues({ ...formValues, img: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, img: undefined });
      toast(
        "error",
        `Unsupported file extension ".${fileExtension}". Please send file with .jpg, .png and .gif extension`
      );
    }
  };

  const validate = (fieldName, fieldValue) => {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  };

  const hasError = () => {
    for (let filedName in formErrors) {
      if (formErrors[filedName]) {
        return true;
      }
    }
  };

  const actionIcons = (
    <div className="col-3 d-flex flex-direction-row gap-3 justify-content-end">
      <div>
        {onClickEdit && (
          <PencilFill
            color={isEditable ? "green" : "black"}
            className={s.icon}
            onClick={onClickEdit}
          />
        )}
      </div>
      <div>
        {onClickDelete && (
          <TrashFill className={s.icon} onClick={onClickDelete} />
        )}
      </div>
    </div>
  );

  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control h-auto"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <p>
        <span
          onInput={(e) => {
            updateFormValues(e);
          }}
          contentEditable={true}
          suppressContentEditableWarning={true}
          role="textbox"
          name="content"
          className="form-control"
        >
          {formValues.content}
        </span>
      </p>
      <FieldError msg={formErrors.content} />
    </div>
  );

  const imageInput = (
    <div className="mb-5">
      <label className="form-label">Image</label>
      <input
        type="file"
        accept="image/*"
        name="img"
        onChange={updateFormImage}
        className="form-control"
      />
    </div>
  );

  const submitButton = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisabled={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-9">
          <h2 className="mb-2">{title}</h2>
        </div>
        {actionIcons}
      </div>

      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        {isEditable ? (
          contentInput
        ) : (
          <pre className={s.content}>{note.content}</pre>
        )}
      </div>
      <div className="mb-3">
        {isEditable
          ? imageInput
          : note.img && (
              <img
                className="mw-100 mh-100"
                src={note.img}
                alt={`note ${note.title} attachment`}
              />
            )}
      </div>
      {onSubmit && submitButton}
    </div>
  );
};

export default NoteForm;
