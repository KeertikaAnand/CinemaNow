import {
	ChevronDoubleDownIcon,
	ChevronDoubleUpIcon,
	MagnifyingGlassIcon,
	TicketIcon,
	TrashIcon
} from '@heroicons/react/24/outline'
import axios from 'axios'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import ShowtimeDetails from '../components/ShowtimeDetails'
import { AuthContext } from '../context/AuthContext'

const User = () => {
	const { auth } = useContext(AuthContext)
	const [users, setUsers] = useState(null)
	const [ticketsUser, setTicketsUser] = useState(null)
	const [tickets, setTickets] = useState([])
	const [isUpdating, SetIsUpdating] = useState(false)
	const [isDeleting, SetIsDeleting] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useForm()

	const fetchUsers = async (data) => {
		try {
			const response = await axios.get('/auth/user', {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			setUsers(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	const onUpdateUser = async (data) => {
		try {
			SetIsUpdating(true)
			const response = await axios.put(`/auth/user/${data.id}`, data, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			fetchUsers()
			toast.success(`Update ${response.data.data.username} to ${response.data.data.role} successful!`, {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} finally {
			SetIsUpdating(false)
		}
	}

	const handleDelete = (data) => {
		const confirmed = window.confirm(`Do you want to delete user ${data.username}?`)
		if (confirmed) {
			onDeleteUser(data)
		}
	}

	const onDeleteUser = async (data) => {
		try {
			SetIsDeleting(true)
			const response = await axios.delete(`/auth/user/${data.id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			fetchUsers()
			toast.success(`Delete successful!`, {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} finally {
			SetIsDeleting(false)
		}
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-white pb-8 text-gray-900 sm:gap-8">
			<Navbar />
			<div className="mx-4 flex h-fit flex-col gap-2 rounded-lg bg-gradient-to-br from-red-200 to-red-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<h2 className="text-3xl font-bold text-gray-900">Users</h2>
				<div className="relative drop-shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<MagnifyingGlassIcon className="h-5 w-5 stroke-2 text-gray-500" />
					</div>
					<input
						type="search"
						className="block w-full rounded-lg border border-gray-300 p-2 pl-10 text-gray-900"
						placeholder="Search username"
						{...register('search')}
					/>
				</div>
				<div
					className={`mt-2 grid max-h-[60vh] overflow-auto rounded-md bg-gradient-to-br from-red-100 to-white`}
					style={{ gridTemplateColumns: 'repeat(3, minmax(max-content, 1fr)) max-content max-content' }}
				>
					<p className="sticky top-0 bg-gradient-to-br from-red-700 to-red-600 px-2 py-1 text-center text-xl font-semibold text-white">
						Username
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-red-700 to-red-600 px-2 py-1 text-center text-xl font-semibold text-white">
						Email
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-red-700 to-red-600 px-2 py-1 text-center text-xl font-semibold text-white">
						Role
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-red-700 to-red-600 px-2 py-1 text-center text-xl font-semibold text-white">
						Ticket
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-red-700 to-red-600 px-2 py-1 text-center text-xl font-semibold text-white">
						Action
					</p>
					{users
						?.filter((user) => user.username.toLowerCase().includes(watch('search')?.toLowerCase() || ''))
						.map((user, index) => {
							return (
								<Fragment key={index}>
									<div className="border-t-2 border-red-200 px-2 py-1">{user.username}</div>
									<div className="border-t-2 border-red-200 px-2 py-1">{user.email}</div>
									<div className="border-t-2 border-red-200 px-2 py-1">{user.role}</div>
									<div className="border-t-2 border-red-200 px-2 py-1">
										<button
											className={`flex items-center justify-center gap-1 rounded bg-gradient-to-r py-1 pl-2 pr-1.5 text-sm font-medium text-white  disabled:from-gray-500 disabled:to-gray-400
										${
											ticketsUser === user.username
												? 'from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400'
												: 'from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400'
										}`}
											onClick={() => {
												setTickets(user.tickets)
												setTicketsUser(user.username)
											}}
										>
											View {user.tickets.length} Tickets
											<TicketIcon className="h-6 w-6" />
										</button>
									</div>
									<div className="flex gap-2 border-t-2 border-red-200 px-2 py-1">
										{user.role === 'user' && (
											<button
												className="flex w-[115px] items-center justify-center gap-1 rounded bg-gradient-to-r from-red-600 to-rose-500 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-500 hover:to-rose-400 disabled:from-gray-500 disabled:to-gray-400"
												onClick={() => onUpdateUser({ id: user._id, role: 'admin' })}
												disabled={isUpdating}
											>
												Set Admin
												<ChevronDoubleUpIcon className="h-5 w-5" />
											</button>
										)}
										{user.role === 'admin' && (
											<button
												className="flex w-[115px] items-center justify-center gap-1 rounded bg-gradient-to-r from-red-600 to-rose-500 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-500 hover:to-rose-400 disabled:from-gray-500 disabled:to-gray-400"
												onClick={() => onUpdateUser({ id: user._id, role: 'user' })}
												disabled={isUpdating}
											>
												Set User
												<ChevronDoubleDownIcon className="h-5 w-5" />
											</button>
										)}
										<button
											className="flex w-[115px] items-center justify-center gap-1 rounded bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-500 disabled:from-gray-500 disabled:to-gray-400"
											onClick={() => handleDelete({ id: user._id, username: user.username })}
											disabled={isDeleting}
										>
											DELETE
											<TrashIcon className="h-5 w-5" />
										</button>
									</div>
								</Fragment>
							)
						})}
				</div>
			</div>
			{ticketsUser && tickets && (
				<ShowtimeDetails tickets={tickets} username={ticketsUser} onClose={() => setTicketsUser(null)} />
			)}
		</div>
	)
}

export default User
