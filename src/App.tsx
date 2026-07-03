import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";

import "./App.css";

import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { Layout } from "@/components/refine-ui/layout/layout";
import { dataProvider } from "./providers/data";

import Dashboard from "@/pages/dashboard";
import { Home } from "lucide-react";
import { BookOpen } from "lucide-react";
import SubjectsCreate from "@/pages/subjects/create.tsx";

function SubjectsList() {
    return null;
}

function App() {
    // @ts-ignore
    let subjects;
    // @ts-ignore
    // @ts-ignore
    return (
        <BrowserRouter>

            <RefineKbarProvider>
                <ThemeProvider>
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "6Na4Wn-JbNWdE-YqHGMp",
                            }}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        label: "Home",
                                        icon: <Home />,
                                    },
                                },
                                {
                                    name: "subjects",
                                    list: "/subjects",
                                    create: "/subjects/create",
                                    meta: {
                                        label: "Subjects",
                                        icon: <BookOpen />,
                                    },
                                }
                            ]}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Layout>
                                            <Outlet />
                                        </Layout>
                                    }
                                >
                                    <Route
                                        path="/"
                                        element={<Dashboard />}
                                    />
                                    <Route path={subjects}>
                                        <Route index element={<SubjectsList />}/>
                                        <Route path="create" element={<SubjectsCreate />} />
                                    </Route>

                                    {/* Example additional routes */}
                                    {/* <Route path="students" element={<Students />} /> */}
                                    {/* <Route path="teachers" element={<Teachers />} /> */}
                                </Route>
                            </Routes>

                            <Toaster />
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>

                        <DevtoolsPanel />
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;