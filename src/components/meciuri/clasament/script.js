document.addEventListener('DOMContentLoaded', function () {
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:5050/api/clasament', true);

request.onload = function () {
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
       /* var tableBody = document.querySelector('#clasament tbody');*/
        data.forEach((echipa) => {
            var teamRow = document.createElement('tr');
            for (var prop in echipa) {
                if (echipa.hasOwnProperty(prop)) {
                    var cell = document.createElement('td');
                    cell.textContent = echipa[prop];
                    teamRow.appendChild(cell);
                }
            }
           /* tableBody.appendChild(teamRow);*/
        });
    } else {
        console.log('error');
    }
};
request.send();

});