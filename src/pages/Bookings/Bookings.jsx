import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
            })
    }, [])

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
                    fetch(`http://localhost:5000/bookings/${id}`, {
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
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDeleteBooking={handleDeleteBooking}
                            ></BookingRow>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Bookings;