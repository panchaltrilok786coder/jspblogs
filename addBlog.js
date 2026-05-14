const form = document.querySelector(".form-box");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title = document.getElementById("blogTitle").value;

  const content = document.getElementById("blogContent").value;

  try {

    const response = await fetch(
      "https://stackblitzstarters6p2huwzn-51dj--3000--4c73681d.local-corp.webcontainer.io",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          content
        })
      }
    );

    const data = await response.json();

    alert(data.message);

  } catch (err) {

    alert(err.message);

  }

});