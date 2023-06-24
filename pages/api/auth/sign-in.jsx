async function signInRequest(req, res) {

    console.log("SSR>>>>LOGIN")

    const payload = req.body

    console.log("URL>>>", `${process.env.NEXT_URL_BACKEND}/auth/login/`)

    const result = await fetch(`${process.env.NEXT_URL_BACKEND}/auth/login/`, {
        method: 'POST',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: payload
    });

    console.log("RESULT>>>", result)

    const user = await result.json();

    return res.status(result.status).json(user);

}


export default async function handler(req, res) {

    if (req.method == 'POST') {
        signInRequest(req, res);

    } else {
        res.status(405).send()

    }

}