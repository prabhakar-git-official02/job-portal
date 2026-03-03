import Swal from "sweetalert2";
export const showAlert = (title, text, icon = "info") => {
  console.trace("Alert called from 👇");
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
    
  });
};