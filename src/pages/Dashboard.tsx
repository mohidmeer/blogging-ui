import { Coins, Edit, Globe, LogOut, Pause, Play, Plus, Timer, Trash, Workflow, FileText } from "lucide-react"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Modern Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Logo size={200} />
                        </div>
                        <div className="flex gap-3 items-center">
                            {/* Credits Card */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                                {loadingCredits ? (
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-5 h-5 text-amber-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : creditError ? (
                                    <span className="text-red-500 text-sm font-semibold">{creditError}</span>
                                ) : (
                                    <>
                                        <Coins className="w-5 h-5 text-amber-600" />
                                        <span className="text-lg font-bold text-slate-800">{credits ?? 0}</span>
                                    </>
                                )}
                                <Modal
                                    id="credits"
                                    title='Buy More Credits'
                                    content={<AddCredits />} >
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-amber-100">
                                        <Plus className="w-4 h-4 text-amber-600" />
                                    </Button>
                                </Modal>
                            </div>
                            {/* User Profile */}
                            <HoverCard openDelay={100}>
                                <HoverCardTrigger>
                                    <Button
                                        size="icon"
                                        className="rounded-full bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border border-slate-300/50 shadow-sm hover:shadow-md transition-all duration-200"
                                        onClick={() => { handleLogout() }}
                                    >
                                        <LogOut className="w-4 h-4 text-slate-700" />
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-64">
                                    <div className="flex gap-3 items-center">
                                        <div className="shrink-0 overflow-hidden rounded-full ring-2 ring-slate-200">
                                            <img src={`https://www.gravatar.com/avatar/${md5(getUseremail())}`} className="h-12 w-12 shrink-0" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 truncate">{getUsername()}</p>
                                            <p className="text-xs text-slate-600 truncate">{getUseremail()}</p>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Section */}
                <div className="mb-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Active Schedules Card */}
                        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                        <Workflow className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold mb-1">{activeSchedulesCount}</p>
                                <p className="text-blue-100 text-sm font-medium">Active Schedules</p>
                            </div>
                        </div>

                        {/* Total Posts Card */}
                        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold mb-1">102</p>
                                <p className="text-emerald-100 text-sm font-medium">Total Posts</p>
                            </div>
                        </div>

                        {/* Add Schedule Card */}
                        <Modal id="blog-id" title="Add a new blog schedule" content={<AddScheduleForm />}>
                            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-dashed border-white/30 hover:border-white/50">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[120px]">
                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-semibold">Add New Schedule</p>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>

                {/* Schedules Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Schedules</h2>
                            <p className="text-slate-600">Manage and monitor your automated blog posts</p>
                        </div>
                    </div>
                    <Schedule setActiveScheduleCount={setActiveScheduleCount} />
                </div>
            </main>
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
        <div role="status" className="flex justify-center items-center w-full py-20">
            <div className="flex flex-col items-center gap-4">
                <svg aria-hidden="true" className="w-12 h-12 text-slate-300 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className="text-slate-500 font-medium">Loading schedules...</p>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
    if (scheduleError) return (
        <div className="flex items-center justify-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
                <p className="text-red-600 font-semibold">{scheduleError}</p>
            </div>
        </div>
    );



    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schedules.map((item) => (
                <div
                    key={item._id}
                    className="group relative bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                    {/* Status Indicator Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${item.active && item.last_run.status
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : !item.last_run.status
                            ? "bg-gradient-to-r from-red-500 to-rose-500"
                            : "bg-gradient-to-r from-amber-500 to-orange-500"
                        }`}></div>

                    {/* Card Header */}
                    <div className="p-5 pb-4 flex items-start justify-between bg-gradient-to-br from-slate-50 to-white">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`p-2.5 rounded-xl ${item.active && item.last_run.status
                                ? "bg-emerald-100 text-emerald-600"
                                : !item.last_run.status
                                    ? "bg-red-100 text-red-600"
                                    : "bg-amber-100 text-amber-600"
                                }`}>
                                <Workflow className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-900 line-clamp-2 text-sm leading-tight">{item.title}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 pt-0 space-y-4">
                        {/* Schedule Time */}
                        <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 bg-slate-100 rounded-lg">
                                <Timer className="w-4 h-4 text-slate-600" />
                            </div>
                            <p className="text-sm font-semibold">{utcToLocalTime(item.schedule.split(',')[1])}</p>
                        </div>

                        {/* Website URL */}
                        <div className="flex items-center gap-2 text-slate-600">
                            <div className="p-1.5 bg-slate-100 rounded-lg">
                                <Globe className="w-4 h-4 text-slate-600" />
                            </div>
                            <p className="text-sm font-semibold truncate">{new URL(item.website_url).hostname}</p>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <HoverCard openDelay={100}>
                                <HoverCardTrigger>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        {item.last_run.status ? (
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                                <span className={`w-2 h-2 rounded-full ${item.active ? "bg-emerald-500" : "bg-amber-500"
                                                    }`}></span>
                                                <p className={`text-xs font-bold ${item.active ? "text-emerald-700" : "text-amber-700"
                                                    }`}>
                                                    {item.active ? "Active" : "Paused"}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                <p className="text-xs font-bold text-red-700">Error</p>
                                            </div>
                                        )}
                                    </div>
                                </HoverCardTrigger>
                                {item.last_run.time && (
                                    <HoverCardContent className="w-[400px]">
                                        <div className="space-y-2">
                                            <p className="text-slate-800 font-semibold text-sm">
                                                Last run <span className="text-slate-600 font-normal">{moment(item.last_run.time).fromNow()}</span>
                                            </p>
                                            {item.last_run.message && (
                                                <p className="text-sm text-slate-600">{item.last_run.message}</p>
                                            )}
                                        </div>
                                    </HoverCardContent>
                                )}
                            </HoverCard>

                            {/* Action Buttons */}
                            <div className="flex gap-1.5">
                                <Modal id="update" title="Update Schedule" content={<EditScheduleForm schedule={item} />}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </Modal>
                                {item.active ? (
                                    <PauseSchedule id={item._id} title={item.title} setSchedules={setSchedules} />
                                ) : (
                                    <RunSchedule message={item.last_run.message} id={item._id} setSchedules={setSchedules} />
                                )}
                                <DeleteSchedule id={item._id} title={item.title} setSchedules={setSchedules} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {
                !loadingSchedules && schedules.length === 0 && (
                    <div className="col-span-full">
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-12 hover:border-slate-400 transition-colors">
                            <div className="p-4 bg-slate-100 rounded-2xl mb-4">
                                <Workflow className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-lg font-semibold text-slate-700 mb-2">No schedules found</p>
                            <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">Get started by creating your first automated blog schedule</p>
                            <Modal id="schedule-id" title="Add Post Schedule" content={<AddScheduleForm />}>
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Your First Schedule
                                </Button>
                            </Modal>
                        </div>
                    </div>
                )
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
                    <p className="text-sm text-slate-600 font-semibold mb-4">Are you sure you want to pause this schedule?</p>

                    <Button
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => { pause() }}
                    >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Schedule
                    </Button>
                </>
            }>
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
                <Pause className="w-4 h-4" />
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
            title={'Are you sure you want to run this schedule?'}
            content={
                <>
                    {message && (
                        <p className="text-sm text-slate-600 font-semibold mb-4">{message}</p>
                    )}
                    <Button
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => { run() }}
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Start Schedule
                    </Button>
                </>
            }>
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
                <Play className="w-4 h-4" />
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
                    <p className="text-sm text-slate-600 font-semibold mb-4">Are you sure you want to delete this schedule? This action cannot be undone.</p>

                    <Button
                        variant="destructive"
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => { del() }}
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete Schedule
                    </Button>
                </>
            }>
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
                <Trash className="w-4 h-4" />
            </Button>

        </Modal>
    )
}
