import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head } from '@inertiajs/react';

const index = ({ auth, projects }) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Projects
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default index;
