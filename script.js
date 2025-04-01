class Transaction{

  static id=0;

  #id;
  #description;
  #amount;

  constructor(description,amount){


    this.#id=++Transaction.id;
    this.#description=description;
    this.#amount=amount;
  }

  get id(){

    return this.#id;

  }


  get description(){

    return this.#description
  }

  get amount(){

    return this.#amount;
  }


  get type(){

    return "generic"
  }


}


class Income extends Transaction{


    get type(){

        return "income"
    }
}


class Expense extends Transaction{

    get type(){

        return "expense"
    }
}


let transactions=[];


function addTransaction(){

    const type=document.getElementById("type").value;
    const desc=document.getElementById("description").value.trim();
    const amt=parseFloat(document.getElementById("amount").value);

    if(!desc||isNaN(amt)||amt<=0){

        alert("Please provide proper description and amount")
        return;
    }


    let transaction;

    if(type==="income"){

        transaction=new Income(desc,amt)
    }else{

        transaction=new Expense(desc,amt)
    }

    transactions.push(transaction);
    renderTransaction();
    updateBalance();

    //clearing

    document.getElementById("description").value= '';
    document.getElementById("amount").value= "";



}


function renderTransaction(){

    const list=document.getElementById("transactionList")

    list.innerHTML="";


    transactions.forEach((tx)=>{


        const li=document.createElement("li");

        li.className=tx.type;

        li.innerHTML=
        `

        <span>${tx.description}  ${tx.type}</span>
        <span>₹${tx.amount}</span>
        <button onclick="removeTransaction(${tx.id})">❌</button>

    `

    list.appendChild(li)
    })
}


function updateBalance(){

    const balance=transactions.reduce((acc,tx)=>{


        return tx.type==="income"? acc+tx.amount:acc-tx.amount
    },0)

    document.getElementById("balance").textContent=balance.toFixed(2);
}

function removeTransaction(id) {
    transactions = transactions.filter(tx => tx.id !== id);
    renderTransaction();
    updateBalance();
  }