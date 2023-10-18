/* eslint-disable indent */
export default function Register() {
    async function create(formData: FormData) {
        "use server";
        formData = formData.get("name") as string;
     
        // mutate data
        // revalidate cache
    }

    return (
       
        <div className="flex justify-center w-screen h-screen bg-blue-400">
            <div className="max-w-d border-2 rounded 2x1 my-20 bg-white opacity-90">
                <div className="flex justify-center my-4">
                    <h6 className="text-2x1 text-zinc-600 font-bold py-4">REGISTER</h6>
                </div>
                <div className="flex-col justify-center my-4">
                    
                    <form action={create} method="post" id="form" >
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Name <span className="text-red-600">*</span></label>
                        <input type="text" name="name" className="border-2 rounded-lg w-full px-2 py-2" placeholder="Joe Biden" required autoFocus/>
                    </div>
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Email <span className="text-red-600">*</span></label>
                        <input type="email" name="email" className="border-2 rounded-lg w-full px-2 py-2" placeholder="joe@biden.com" required/>
                    </div>
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">DOB <span className="text-red-600">*</span></label>
                        <input type="date" name="date" className="border-2 rounded-lg w-full px-2 py-2" placeholder="dd/mm/yyyy" required />
                    </div>
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Driver License ID <span className="text-red-600">*</span></label>
                        <input type="text" name="ID" className="border-2 rounded-lg w-full px-2 py-2" placeholder="A47D88V" required />
                    </div>
                    
                    <div className="mb2 px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Password <span className="text-red-600">*</span></label>
                        <input type="password" name="password" className="border-2 rounded-lg w-full px-2 py-2" placeholder="*********" required/>
                    </div>
                    
                    <div className="mb2 px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Confirm Password <span className="text-red-600">*</span></label>
                        <input type="password" className="border-2 rounded-lg w-full px-2 py-2" placeholder="**********" required />
                    </div>
                    
                    <div className="mb2 flex justify-center py-4">
                        <button name="intent" value="register" className="border-2 rounded-lg px-8 py-4 bg-blue-400 text-white font-bold hover:bg-blue-800" type="submit">
                            Submit
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}