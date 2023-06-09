import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Bookings = () => {

    const { user, logOut } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const navigate = useNavigate()


    const url = `https://car-doctor-server-nine-rho.vercel.app/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            },

        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {

                    setBookings(data);
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Session Timeout Login again',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })

                    logOut();
                    navigate('/bookings')
                }
            })
    }, [url, navigate])


    const handleBookingConfirm = id => {
        fetch(`https://car-doctor-server-nine-rho.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id)
                    updated.status = 'confirm'
                    setBookings([updated, ...remaining])
                }
            })
    }

    const handleDeleteBooking = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://car-doctor-server-nine-rho.vercel.app/bookings/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your booking has been deleted.',
                                    'success'
                                )
                                const remaining = bookings.filter(booking => booking._id !== id)
                                setBookings(remaining)
                            }
                        })

                }
            })

    }

    return (
        <div>
            <h1 className="text-5xl font-bold my-5 text-center">My Bookings: {bookings.length}</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>
                        {
                            bookings?.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDeleteBooking={handleDeleteBooking}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Bookings;