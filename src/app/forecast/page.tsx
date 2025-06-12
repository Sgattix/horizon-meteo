import React from "react";

export default function Page() {
  React.useEffect(() => {
    window.location.href = "/forecast/in-my-city";
  }, []);

  return <div>Page</div>;
}
