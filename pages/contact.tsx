import Layout from "../Components/Layout/Layout";
import CONFIG from "../CONFIG";
import nookies from "nookies";
import SEO from "../Components/Misc/SEO";
import Router from "next/router";

export default function Contact() {
  const submit = (event: any) => {
    event.preventDefault();

    fetch(`${CONFIG.API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          email: event.target[0].value,
          type: event.target[1].value,
          message: event.target[2].value,
        },
      }),
    }).then((res) => {
      if (res.status == 200) {
        alert("Your message was received. Thanks!");
        Router.reload();
      } else {
        alert("Something went wrong; Try again later.");
      }
    });
  };

  return (
    <Layout isLoggedIn>
      <SEO
        title="Contact us at indipix"
        description="Contact Indipix staff"
        keywords="contact,indipix"
      />
      <div className="container mx-auto px-5 lg:px-10 xl:px-20 mt-10 mb-10">
        <div className="flex gap-10">
          <div className=" w-1/2">
            <img
              className="w-full"
              src="https://source.unsplash.com/JYGnB9gTCls/500x500"
              alt=""
            />
          </div>

          <div className="w-1/2">
            <h1 className="text-5xl">Contact Indipix</h1>
            <p>We are there to hear out your queries</p>
            <form onSubmit={submit} className="mt-5 flex flex-wrap">
              <div className="mb-5 w-full">
                <input
                  required
                  className="p-3 bg-gray-100 w-full"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                />
                <p>
                  <small>
                    The Email address you want us to contact you with
                  </small>
                </p>
              </div>

              <div className="mb-5 w-full">
                <select required className="shadow w-full p-3" name="" id="">
                  <option value="Technical Issue">
                    Buy Enterprise Package
                  </option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Billing Issue">Billing Issue</option>
                </select>
              </div>

              <div className="mb-5 w-full">
                <textarea
                  className="bg-gray-50 p-5 shadow-inner w-full"
                  name="comment"
                  id="comment"
                  cols={30}
                  rows={10}
                  placeholder="Comments"
                ></textarea>
              </div>

              <p className="my-4 text-lg text-gray-400">
                By sending us a message you agree to be contacted by us.
              </p>
              <input
                type="submit"
                value="Send"
                className="px-10 py-5 bg-red-700 text-white w-full hover:bg-red-800 cursor-pointer shadow"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerside(context: any) {
  try {
    const cookies = nookies.get(context);

    const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    const userData = await userResponse.json();

    return {
      props: {
        loggedIn: userResponse.status == 200 ? true : false,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
