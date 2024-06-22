import React, { useEffect,useState } from 'react'
import axios from "axios"

function MainPage(){

    const [date,setDate]=useState("");
    const [sourceCurrency,setsCurrency]=useState(0);
    const [tCurrency,settCurrency]=useState(0);
    const [amount,setAmount]=useState(0);
    const [currencyNames,setCurrencyNames]=useState([]);
    const [finalPrice,setFinalPrice]=useState(0);

    const handleSubmit= async (e)=>{

        e.preventDefault();

        const response = await axios.get("https://backend-2-jiaf.onrender.com/convert",{params:{date,sourceCurrency,tCurrency,amount,},});

        setFinalPrice(response.data);


    }

    useEffect(()=>{

        const getList = async ()=>{

            try{
                
              const responce = await axios.get("https://backend-2-jiaf.onrender.com/getAllCurrency",{

                params:{date,sourceCurrency,tCurrency,amount}

              });
              
              setCurrencyNames(responce.data);


            }catch(err){

                console.error(err);

            }

        }

        getList();

    });

    return(

        <>

            <div className="mx-20 my-6">

                <section>

                    <div >
                        
                        <h1 className='text-5xl font-bold text-green-500'>Convert Your Currencies Today</h1>
                    
                        <p className=" py-6">Welcome to "Convert Your Currencies Today"! This application
                        allows you to easily convert currencies based on the latest exchange
                        rates. Whether you're planning a trip, managing Your
                        finances or simply curious about the value of your money in
                        different currencies, this tool is here to help.
                        </p>

                    </div>

                <div className="flex items flex-col px-60">
                    
                        <form onSubmit={handleSubmit}>

                            <label>Date</label>
                            <br></br>
                            <input onChange={(e)=>setDate(e.target.value)} className="text-black bg-slate-800 text-white rounded-lg  px-6 block w-full px-5 py-2" type="Date"/>

                            <br></br>

                            <label>Source Currency</label>
                            <br></br>
                            <select onChange={(e)=>setsCurrency(e.target.value)} className="text-black bg-slate-800 text-white rounded-lg  px-6 block w-full px-5 py-2" name="" id="">

                                <option>select a source currency</option>
                                {Object.keys(currencyNames).map((x)=>(

                                    <option value={x}>{x} : {currencyNames[x]}</option>

                                ))}
                                

                            </select>

                            <br></br>

                            <label>Target Currency</label>
                            <br></br>
                            <select onChange={(e)=>settCurrency(e.target.value)} className="text-black block w-full px-5 py-2 bg-slate-800 text-white rounded-lg ">

                                <option>select a target currency </option>

                                {Object.keys(currencyNames).map((y)=>(

                                    <option value={y}>{y} : {currencyNames[y]}</option>

                                ))}

                            </select>

                            <br></br>

                            <label>Amount in source currency</label>
                            <br></br>
                            <input onChange={(e)=>setAmount(e.target.value)} className="bg-slate-800 text-white rounded-lg  block w-full text-black px-6 py-2" type="text" placeholder='Amount in source currency.........' />

                            <br></br>

                            <button className="bg-green-700 rounded-lg px-4 py-2">Get the target Currency</button>

                            <br></br>

                            <label className='py-5 block w-full'>{amount} {sourceCurrency} is {finalPrice.toFixed(2)} {tCurrency}</label>

                        </form>
                    </div>
                </section>    
            </div>

        </>

    );

}

export default MainPage