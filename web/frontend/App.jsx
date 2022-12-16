import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import { CustomIntercomProvider } from './components/providers/CustomIntercomProvider'

import {
    AppBridgeProvider,
    QueryProvider,
    PolarisProvider,
} from "./components";

export default function App() {
    // Any .tsx or .jsx files in /pages will become a route
    // See documentation for <Routes /> for more info
    const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

    return (
        <PolarisProvider>
            <BrowserRouter>
                <AppBridgeProvider>
                    <QueryProvider>
                        <CustomIntercomProvider>
                        <NavigationMenu
                            navigationLinks={[
                                {
                                    label: "Shipments",
                                    destination: "/shipments",
                                },
                                {
                                    label: "Tracking Page",
                                    destination: "/trackingPage",
                                },
                                {
                                    label: "Plans",
                                    destination: "/plans",
                                },
                                {
                                    label: "Tutorials",
                                    destination: "/tutorials",
                                },
                                {
                                    label: "Settings",
                                    destination: "/settings",
                                },
                            ]}
                        />
                        <Routes pages={pages} />
                        </CustomIntercomProvider>
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
