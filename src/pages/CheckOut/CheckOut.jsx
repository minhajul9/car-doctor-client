import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const CheckOut = () => {

    const service = useLoaderData();
    const { title, price, _id, img } = service;

    const {user} = useContext(AuthContext)

    const handleBookService = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        
        const date = form.date.value;

        const order = {
            customerName: name, 
            email,
            img,
            date,
            service: title,
            price,

        }
        console.log(order);

        fetch('https://car-doctor-server-nine-rho.vercel.app/bookings',{
            method: "POST", 
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                Swal.fire({
                    title: 'Success',
                    text: 'Order sent successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
            }
        })

    }

    return (
        <div>
            <h1>book service: {title}</h1>

            <form onSubmit={handleBookService}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date'  className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' defaultValue={user?.email} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" readOnly defaultValue={"$ "+price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block mb-12" type="submit" value="Confirm Order" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;