import axios from 'axios';

export function StoreDesignInfo(
    uid,
    userEmail,
    userName,
    productDetail,
    getResponse
) {
    axios
        .post(`${window.host}/request-design`, {
            productDetail: productDetail,
            uid: uid,
            userEmail: userEmail,
            username: userName,
        })
        .then((response) => {
            console.log(response, 'mailsent');
            if (response.data) {
                const { mailSent } = response.data;
                console.log(mailSent, 'mailsent');
                return getResponse(mailSent);
            }
        });
}
