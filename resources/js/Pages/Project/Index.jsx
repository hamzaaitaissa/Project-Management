import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

const index = ({ auth, projects, queryParams = null }) => {
    queryParams = queryParams||{};
    const searchFieldChanged=(name,value)=>{
        if(value){
            queryParams[name] = value
        }else{
            delete  queryParams[name];
        }
        router.get(route("project.index"), queryParams);
    }

    const onKeyPress = (name,e)=>{
        console.log(e.key)
        if(!e.key == "Enter") return;
        searchFieldChanged(name,e.target.value);
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Created At
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Owner
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3"> </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"></th>
                                            <th scope="col" className="px-6 py-3">
                                                <TextInput defaultValue={queryParams.name} className="w-full" onBlur={e=>searchFieldChanged('name',e.target.value)} onKeyPress={e=> onKeyPress('name',e)} placeholder="Filter by name"/>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <SelectInput defaultValue={queryParams.status} className="w-full" onChange={e=>searchFieldChanged('status',e.target.value)}>
                                                    <option value="" >Select Value</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th scope="col" className="px-6 py-3"> 
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => {
                                            return (
                                                <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-6 py-4">
                                                        {project.id}
                                                    </td>
                                                    <td className="px-6 py-4 flex justify-center items-center">
                                                        <img
                                                            src={
                                                                project.image_path
                                                            }
                                                            alt=""
                                                            className="rounded-full w-[60px] h-[60px]"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {project.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {project.created_at}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {project.createdBy.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            href={route(
                                                                "project.edit",
                                                                project.id
                                                            )}
                                                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 
                                                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 
                                                            mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 
                                                            dark:focus:ring-blue-800"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "project.destroy",
                                                                project.id
                                                            )}
                                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 
                                                            focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
                                                             dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default index;
