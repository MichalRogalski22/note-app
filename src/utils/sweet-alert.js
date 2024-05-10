import Swal from "sweetalert2";

export const toast = async (type, msg) => {
  return Swal.fire({
    position: "top-end",
    icon: type,
    showConfirmButton: false,
    timer: 3000,
    toast: true,
    title: msg
  })
}