export const convertToSpecialChars = (input: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = input;
  return textarea.value;
};
