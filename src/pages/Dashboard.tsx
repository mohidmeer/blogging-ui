import { Coins, Edit, Globe, LogOut, Pause, Play, Plus, Timer, Trash, Workflow } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { getUseremail, getUsername, utcToLocalTime } from "../lib/utils";
import { apiService } from "../api/client";
import Modal from "../components/Modal";
import AddCredits from "../components/AddCredits";
import AddScheduleForm from "../components/AddSchedule";
import EditScheduleForm from "../components/EditSchedule";
import { useEffect, useState } from "react";
import moment from 'moment';
import md5 from "md5";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../components/ui/hover-card"
import Logo from "../components/Logo";

const Dashboard = () => {
    const navigate = useNavigate()
    const [credits, setCredits] = useState<number | null>(null);
    const [loadingCredits, setLoadingCredits] = useState(true);
    const [creditError, setCreditError] = useState<string | null>(null);
    const [activeSchedulesCount, setActiveScheduleCount] = useState(0)

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const data = await apiService.ShowCredits();
                setCredits(data.credits); // Set credits dynamically
            } catch (error: any) {
                setCreditError(error.message || "An error occurred while fetching credits.");
            } finally {
                setLoadingCredits(false); // Stop loading
            }
        };

        fetchCredits();
    }, []);
    // Dynamically calculate the number of active schedules
    const handleLogout = () => {
        localStorage.removeItem("blogger-api-auth-token");
        navigate("/auth/login");
    };
    return (
        <div className="container mx-auto">
            <div className="">
                <div className="flex justify-between items-center border px-4 py-2 ">
                    <Logo size={300} />
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2  font-bold">
                            {/* Loading or Error State for Credits */}
                            {loadingCredits ? (
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : creditError ? (
                                <span className="text-red-500">{creditError}</span>
                            ) : (
                                <>
                                    <span>{credits ?? 0}</span> {/* Display credits or 0 if undefined */}
                                </>
                            )}
                            <Coins />
                            <Modal
                                id="credits"
                                title='Buy More Credits'
                                content={<AddCredits />} >
                                <Button variant="outline" size="icon">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </Modal>
                        </div>
                        <HoverCard openDelay={100} >
                            <HoverCardTrigger>
                                <Button size="icon" className="hover:bg-destructive" onClick={() => { handleLogout() }}>
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent >
                                <div className="flex gap-1">
                                    <div className="shrink-0 overflow-hidden rounded-full">
                                        <img src={`https://www.gravatar.com/avatar/${md5(getUseremail())}`} className=" h-10 w-10 shrink-0 " />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{getUsername()}</p>
                                        <p className="text-sm text-primary/80 font-semibold">{getUseremail()}</p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                <div className="flex flex-col justify-center p-4 ">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mt-10">
                        {/* Active Schedules */}
                        <div className="bg-primary text-white p-6 rounded-lg text-center">
                            <p className="text-2xl font-bold">{activeSchedulesCount}</p>
                            <p className="text-sm">Active Schedules</p>
                        </div>
                        {/* Total Posts */}
                        <div className="bg-primary text-white p-6 rounded-lg text-center">
                            <p className="text-2xl font-bold">102</p>
                            <p className="text-sm">Total Posts</p>
                        </div>

                        <Modal id="blog-id" title="Add a new blog schedule" content={<AddScheduleForm />}>
                            <div className="bg-primary text-white p-6 rounded-lg flex flex-col items-center justify-center">
                                <Plus className="size-8 border-white rounded-md p-1" />
                                <p className="text-sm mt-2">Add new Schedule</p>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="text-xl font-bold mb-4  ">Schedules</h4>
                    <Schedule setActiveScheduleCount={setActiveScheduleCount} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard


function Schedule({ setActiveScheduleCount }: { setActiveScheduleCount: any }) {
    interface Schedule {
        _id: string; // MongoDB ObjectID
        title: string;
        instructions: string;
        niche: string;
        schedule: string; // e.g., "minute"
        username: string;
        password: string;
        website_url: string;
        publish_status: boolean; // e.g., false
        include_image: boolean; // e.g., false
        time: string; // e.g., "08:00"
        active: boolean; // e.g., false
        last_run: {
            time: string | null;
            message: string | null;
            status: boolean;
        };
    }

    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState(true);
    const [scheduleError, setScheduleError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await apiService.GetAllSchedules();
                setSchedules(data.schedules as Schedule[]);
                setActiveScheduleCount(data.schedules.filter(schedule => schedule.active).length);
            } catch (error: any) {
                setScheduleError(error.message || "An error occurred while fetching schedules.");
            } finally {
                setLoadingSchedules(false);
            }
        };

        fetchSchedules();
    }, []);

    if (loadingSchedules) return (
        <div role="status" className="flex justify-center items-center w-full">
            <svg aria-hidden="true" className="size-36  text-gray-200 animate-spin  fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
    if (scheduleError) return <p className="text-red-500">{scheduleError}</p>;



    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {schedules.map((item) => (
                <div
                    key={item._id}
                    className="border rounded-md cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                    <div className="p-4 flex items-center justify-between">
                        <Workflow />
                        <div className="flex gap-2">
                            <Modal id="update" title="Update Schedule" content={<EditScheduleForm schedule={item} />}>
                                <Button variant={'outline'}>
                                    <Edit size={20} />
                                </Button>
                            </Modal>
                            {
                                item.active ?
                                    <PauseSchedule id={item._id} title={item.title} setSchedules={setSchedules} /> :
                                    <RunSchedule message={item.last_run.message} id={item._id} setSchedules={setSchedules} />
                            }
                            <DeleteSchedule id={item._id} title={item.title} setSchedules={setSchedules} />
                        </div>
                    </div>
                    <div className="bg-gray-100 p-2 flex  flex-col gap-2 text-gray-800">
                        <p className="font-bold  p-0 line-clamp-2">{item.title}</p>
                        <div className="gap-1 text-sm font-bold text-gray-500 mt-2 flex items-center">
                            <Timer size={20} />
                            <p>{utcToLocalTime(item.schedule.split(',')[1])}</p>

                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <div className="flex gap-1 items-center ">
                                <Globe size={20} />
                                <p className="font-bold text-sm ">{new URL(item.website_url).hostname}</p>
                            </div>
                            <HoverCard openDelay={100} >
                                <HoverCardTrigger>
                                    {
                                        item.last_run.status ?
                                            <div className="flex gap-2 items-center">
                                                <span className={`${item.active ? "bg-green-600" : "bg-yellow-500"} size-3 rounded-full`}></span>
                                                <p className="text-sm font-bold text-black">{item.active ? "Active" : "Paused"}</p>
                                            </div>
                                            :
                                            <div className="flex items-center gap-1">
                                                <span className="size-3 bg-red-700 rounded-full" ></span>
                                                <p className="text-sm font-bold text-black">Error</p>
                                            </div>
                                    }
                                </HoverCardTrigger>
                                {
                                    item.last_run.time &&
                                    (
                                        <HoverCardContent className="w-[400px] flex flex-col gap-2">
                                            <p className="text-gray-800 font-semibold text-base">
                                                Last run <span className=""> {moment(item.last_run.time).fromNow()} </span>
                                            </p>
                                            {item.last_run.message}
                                        </HoverCardContent>
                                    )
                                }
                            </HoverCard>
                        </div>
                    </div>
                </div>
            ))}
            {
                !loadingSchedules && schedules.length === 0 &&
                <div className="col-span-full flex items-center justify-center font-semibold   rounded-md  p-4  border-4 border-dashed ">
                    <div className="p-8 text-xl">
                        <Modal id="schedule-id" title="Add Post Schedule" content={<AddScheduleForm />}>
                            <div className="text-center  flex flex-col gap-2">
                                <p> <span className="text-center font-medium  ">No schedules found </span> </p>
                                <Button className="">Create one</Button>
                            </div>
                        </Modal>

                    </div>
                </div>
            }
        </div>
    )
}
function PauseSchedule({ title, id, setSchedules }: { title: string, id: string, setSchedules: any }) {
    async function pause() {
        try {
            const response = await apiService.StopSchedule(id);
            console.log(response);
            if (response.success) {
                setSchedules((prevSchedules: any) =>
                    prevSchedules.map((schedule: any) =>
                        schedule._id === id ? { ...schedule, active: false } : schedule
                    )
                );
            } else {


            }
        } catch (error: any) {
            console.error(error);

        }
    }
    return (
        <Modal
            id="pause"
            title={title}
            content={
                <>
                    <p className="text-sm text-muted-foreground font-semibold">Are you sure you want to pause this schedule ?</p>

                    <Button variant={'outline'} className="bg-amber-300 hover:bg-amber-400" onClick={() => { pause() }}>
                        Pause Schedule
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Pause size={20} className="text-amber-400 cursor-pointer" />
            </Button>

        </Modal>
    )
}
function RunSchedule({ id, setSchedules, message }: { id: string, setSchedules: any, message: string | null; }) {
    async function run() {
        try {
            const response = await apiService.RunSchedule(id);
            console.log(response);
            if (response.success) {
                setSchedules((prevSchedules: any) =>
                    prevSchedules.map((schedule: any) =>
                        schedule._id === id ? {
                            ...schedule, active: true, last_run: {
                                ...schedule.last_run,
                                status: true
                            }
                        } : schedule
                    )
                );
            } else {
                throw new Error("Failed to stop schedule.");
            }
        } catch (error: any) {
            console.error(error);

        }
    }
    return (
        <Modal
            id="run"
            title={'Are you sure you want to run this schedule ?'}
            content={
                <>

                    <p className="text-sm font-semibold ">{message}</p>
                    <Button onClick={() => { run() }}>
                        Start Schedule
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Play size={20} className="text-green-600 cursor-pointer" />
            </Button>

        </Modal>
    )
}
function DeleteSchedule({ title, id, setSchedules }: { title: string, id: string, setSchedules: any }) {
    async function del() {
        try {
            const response = await apiService.DeleteSchedule(id);
            console.log(response);
            if (response.success) {
                setSchedules((prevSchedules: any) =>
                    prevSchedules.filter((schedule: any) => schedule._id !== id)
                );
            } else {
                throw new Error("Failed to stop schedule.");
            }
        } catch (error: any) {
            console.error(error);

        }
    }
    return (
        <Modal
            id="run"
            title={title}
            content={
                <>
                    <p className="text-sm text-muted-foreground font-semibold">Are you sure you want to run this schedule ?</p>

                    <Button variant={'destructive'} onClick={() => { del() }}>
                        Delete Schedule
                    </Button>
                </>
            }>
            <Button variant={'outline'}>
                <Trash size={20} className="text-destructive cursor-pointer" />
            </Button>

        </Modal>
    )
}
