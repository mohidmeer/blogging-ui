import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";
import { toast } from "react-toastify";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Eye, EyeOff } from "lucide-react";
import ScheduleTime from "./ScheduleTime";

const AddScheduleForm = () => {


    const [type,setType] = useState('password')

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            instructions: "",
            niche: "",
            schedule:'',
            username: "admin",
            website_url: window.location.origin,
            password: "",
            include_image: true,
            publish_status: true
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {

        const tid = toast.loading("Saving ....")
        console.log(data);

        setLoading(true);

        try {
            const response = await apiService.AddSchedule(data);

            if (response.success) {
                toast.update(tid, { render: "Added Schedule successfully", type: "success", isLoading: false, autoClose: 1000 });
                document.getElementById('close-dialog')?.click();
                window.location.reload();

            } else {
                throw new Error("Failed to add schedule.");
            }
        } catch (error: any) {
            toast.update(tid, { render: "Error occured while saving schedule", type: "error", isLoading: false, autoClose: 1000 });

        } finally {
            setLoading(false);
        }
    };

    async function generatePassword() {

        const tisd = toast.loading('Generating wordpress application password')


        try {

            // @ts-ignore
            const nonce = window.autoBloggerData.nonce;
            const res = await fetch('/wp-json/wp/v2/users/me/application-passwords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce,
                },
                body: JSON.stringify({ name: 'Auto Blogger' }),
                credentials: 'include',
            });
            const data = await res.json();

            console.log(`🔐 Status: ${res.status}`);

            if (res.ok) {
                setValue('password', data.password)
                toast.update(tisd, { type: 'success', render: 'Password generated successfully', isLoading: false, autoClose: 1000 })
            } else {
                toast.update(tisd, { type: 'error', render: `Error:${data.message || 'Something went wrong'} `, isLoading: false, autoClose: 1000 })
            }

        } catch (error) {
            toast.update(tisd, { type: 'error', render: 'An error occured while generating password', isLoading: false, autoClose: 1000 })
        }
    }

    const handlePasswordVisibility=()=>{
        if (type=='text'){
            setType('password')
        }else{
            setType('text')
        }
    }

    return (
        <form
            className="flex-1 flex flex-col justify-center items-center overflow-auto"
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="p-1 flex flex-col gap-2 max-w-[600px] mx-auto w-full max-h-screen overflow-auto">
                <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold">Title</label>
                        <input
                            className={`input w-full input-sm ${errors.title ? "border-red-500" : ""
                                }`}
                            type="text"
                            placeholder="Schedule Title (for your reference)"
                            data-error={errors.title && true}
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-xs mt-1 font-semibold text-red-500">
                                {errors.title.message as string}
                            </p>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold">Instructions</label>
                        <textarea
                            className={`input w-full input-sm ${errors.instructions ? "border-red-500" : ""
                                }`}
                            placeholder="e.g. Write in a friendly, beginner-friendly tone. Keep it informative and engaging. Use simple language and real-life examples where possible."
                            data-error={errors.instructions && true}
                            cols={2}
                            {...register("instructions", { required: "Instructions are required" })}
                        />
                        {errors.instructions && (
                            <p className="text-xs mt-1 font-semibold text-red-500">
                                {errors.instructions.message as string}
                            </p>
                        )}
                    </div>

                    {/* Niche */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold">Niche</label>
                        <input
                            className={`input w-full input-sm ${errors.niche ? "border-red-500" : ""
                                }`}
                            type="text"
                            placeholder="Enter niche (e.g. Personal Finance, Fitness, Web Development, Mental Health, Travel Tips)"
                            data-error={errors.niche && true}
                            {...register("niche", { required: "Niche is required" })}
                        />
                        {errors.niche && (
                            <p className="text-xs mt-1 font-semibold text-red-500">
                                {errors.niche.message as string}
                            </p>
                        )}
                    </div>
                    {/* Include AI generated Images */}
                    <div className="flex flex-col gap-1 w-full">
                        <div className="border rounded-md p-4">
                            <label className="inline-flex items-center justify-between w-full cursor-pointer">
                                <input type="checkbox" className="sr-only peer" {...register("include_image")} />
                                <span className="text-sm font-medium  ">
                                    Include AI-generated featured image?
                                </span>
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    {/* Blog Publish status */}
                    <div className="flex flex-col gap-1 w-full">
                        <div className="border rounded-md p-4">
                            <label className="inline-flex items-center justify-between w-full cursor-pointer">
                                <input type="checkbox" className="sr-only peer" {...register("publish_status")} />
                                <span className="text-sm font-medium  ">
                                    Publish blog or Save as Draft?
                                </span>
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        {/* Website URL */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold">Wordpress website url</label>
                            <input
                                className={`input w-full input-sm ${errors.website_url ? "border-red-500" : ""
                                    }`}
                                type="url"
                                placeholder="Enter website URL"
                                data-error={errors.website_url && true}
                                {...register("website_url", { required: "Website URL is required" })}
                            />
                            {errors.website_url && (
                                <p className="text-xs mt-1 font-semibold text-red-500">
                                    {errors.website_url.message as string}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold">Wordpress admin username</label>
                            <input
                                className={`input w-full input-sm ${errors.username ? "border-red-500" : ""
                                    }`}
                                type="text"
                                placeholder="Wordpress Admin Username"
                                data-error={errors.username && true}
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && (
                                <p className="text-xs mt-1 font-semibold text-red-500">
                                    {errors.username.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold">Wordpress application password</label>
                        <div className="flex gap-2 items-center">
                            <div className="w-full relative">
                               <button type="button" onClick={handlePasswordVisibility} className="absolute right-2 top-1 cursor-pointer ">
                               {
                                    type=='text'? <Eye size={18}/>:<EyeOff size={18}/>

                                }
                               </button>
                            <input
                                className={`input w-full input-sm ${errors.password ? "border-red-500" : ""
                                    }`}
                                type={type}
                                placeholder="8Lcz afuy bvNu r6Wi QP2m VOfp"
                                data-error={errors.password && true}
                                {...register("password", { required: "Password is required" })}
                            />
                            </div>
                            <HoverCard openDelay={100} >
                                <HoverCardTrigger>
                                    <Button onClick={() => { generatePassword() }} type="button">
                                        Create password
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-[400px] flex flex-col gap-2">
                                    <p className="text-gray-800 text-base font-semibold">
                                        You can create a WordPress application password manually by going to your <strong className="font-bold">Profile &gt; Application Passwords</strong> and generating one yourself. <br />
                                        Or, simply click the button below to automatically generate a WordPress application password for you.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>

                        </div>
                        {errors.password && (
                            <p className="text-xs mt-1 font-semibold text-red-500">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>


                    <ScheduleTime initialDays={95} initialTime="" onUpdate={(v: any) => {
                        setValue('schedule', v)
                    }} />

                    
                    {/* Submit Button */}
                    <div className="flex flex-col gap-1 mt-4">
                        <Button disabled={loading}>
                            {loading ? "Adding..." : "Submit"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddScheduleForm;