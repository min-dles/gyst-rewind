import { useEffect, useState } from "react";

const ArticleText = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? children : ""}
    </>
  );
}

export default ArticleText;