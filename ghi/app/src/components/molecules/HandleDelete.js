import Button from "../atoms/Button";

export default function HandleDelete(url) {
  const handleDelete = async () => {
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url.url, fetchConfig);
      if (response.ok) {
        const json = await response.json();
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return <Button text="Delete" onClick={handleDelete} />;
}
