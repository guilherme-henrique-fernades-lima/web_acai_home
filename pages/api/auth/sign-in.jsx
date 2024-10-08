async function signInRequest(req, res) {

    const payload = req.body

    const result = await fetch(`${process.env.NEXT_URL_BACKEND}/auth/login/`, {
        method: 'POST',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: payload
    });

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