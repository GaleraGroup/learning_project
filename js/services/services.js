const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json();
};


//Аналог с помощью XMLHttpRequest
// const request = new XMLHttpRequest();
// request.open('POST', 'server.php');
// request.setRequestHeader('Content-type', 'application/json');

//request.send(JSON.stringify(obj));

// request.addEventListener('load', () => {
//     if (request.status === 200) {
//         console.log(request.response);
//         showThanksModal(msg.success);
//         form.reset();
//     } else {
//         showThanksModal(msg.failure);
//     }
// });


const getResFromDB = async (url) => {
    return await fetch(url);
};

export {postData, getResFromDB};
