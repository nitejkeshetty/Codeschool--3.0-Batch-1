
let params = new URLSearchParams(location.search);
if (params.get("error")) {
    alert(params.get("error"));
    window.history.replaceState(null, "", window.location.pathname);
}

if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

$.ajax({
    url: "./api/getUser.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        console.log(response);
        $("#profileName").text(response.data.user.name);
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./login.html?error=" + data.message;
    },
});

function sidebar() {
    $(".sideBar").toggleClass("show-sidebar");
}
function logout() {
    localStorage.clear();
}