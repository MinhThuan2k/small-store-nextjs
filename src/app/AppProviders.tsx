/** @format */

"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { OverlayLoading } from "@/components/ui/loading/OverlayLoading";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<Suspense
				fallback={
					<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
						<OverlayLoading />
					</div>
				}
			>
				<QueryClientProvider client={queryClient}>
					{children}
					<ToastContainer position="top-right" autoClose={3000} />
				</QueryClientProvider>
			</Suspense>
		</Provider>
	);
}
