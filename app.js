const apiUrl = "https://crudcrud.com/api/71c548d6677744b794280bbf61c9ebbf/candies";
let candyList = []
let totalQuantity =0;

function addCandy() {
    const candy = document.getElementById('candyName').value;
    const descript = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    if (candy && descript && quantity && price){
        const candy = {
            name: candyName,
            descript: descript,
            quantity: quantity,
            price: price
        };
        axios.post(apiUrl,candy)
            .then((response)=>{
                candyList.push(response.data);

            const candyListItem = document.createElement("li");
            const candytext = document.createTextNode(`${candyName} , ${descript} ,${quantity} , ${price}`);
            candyListItem.appendChild(candytext);
            document.getElementById("candyList").appendChild(candyListItem);

            document.getElementById("candyName").value = "";
            document.getElementById("description").value = "";
            document.getElementById("quantity").value = "";
            document.getElementById("price").value = "";

            const userInputText = document.createTextNode(`${name},${descript},${quantity},${price}`);
            document.getElementById("userInputs").appendChild(userInputText);
        })
        .catch((error)=>{
            console.log(error);
        });
        }
    }

function removeCandy(){
    const selectedCandies = document.querySelectorAll('#candyList li input[type=checkbox]: checked');
    if (selectedCandies.length>0){
        const promises=[];
        selectedCandies.forEach((selectedCandy)=>{
            const candyId = selectedCandy.value;
            const candyIndex = candyList.findIndex((candy)=>{
                return candy._id === candyId;
            });
            const candyQuantity = candyList[candyIndex].quantity;
            promises.push(axios.delete(`${apiUrl}/${candyId}`)
            .then(()=>{
                candyList.splice(candyIndex,1);

                const candyListItem = selectedCandy.parentElement;
                const candyText = candyListItem.firstChild;
                const candyInfo = candyText.textContent.split(":");
                const candyName = candyInfo[0];
                const quantity = candyInfo[1].split(" ")[1];
                candyListItem.remove()

                const userInputText = document.createTextNode()

            })
            
            )

        })
    }
}