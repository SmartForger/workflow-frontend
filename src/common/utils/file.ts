export const readFileBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result;
      resolve(contents as string);
    };
    reader.onerror = (e) => {
      reject(e.target?.error);
    };
    reader.readAsDataURL(file);
  });
