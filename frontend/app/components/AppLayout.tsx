'use client';
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Bell, Users, Menu, X, Activity, LogOut, Cog, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
	{ label: "Dashboard", path: "/", icon: LayoutDashboard },
	{ label: "Alerts", path: "/alerts", icon: Bell },
	{ label: "Engineers", path: "/engineers", icon: Users },
	{ label: "Machines", path: "/machines", icon: Cog },
	{ label: "Workflow", path: "/workflow", icon: GitBranch },
];

export default function AppLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const handleLogout = () => {
		localStorage.removeItem("isLoggedIn");
		router.push("/login");
	};

	return (
		<div className="flex min-h-screen">
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed z-40 inset-y-0 left-0 w-60 bg-card border-r border-border flex flex-col transition-all duration-300 md:static md:z-auto",
					sidebarOpen
						? "md:w-60 translate-x-0"
						: "md:w-0 md:overflow-hidden -translate-x-full md:translate-x-0"
				)}
			>
				<div
					className="flex items-center gap-2 px-5 py-5 border-b border-border cursor-pointer select-none"
					onClick={() => setSidebarOpen((prev) => !prev)}
				>
					<Activity className="h-6 w-6 text-primary shrink-0" />
					<span className="font-heading font-semibold text-lg text-foreground whitespace-nowrap">
						PredictAI
					</span>
				</div>

				<nav className="flex-1 p-3 space-y-1">
					{navItems.map((item) => {
						const active = pathname === item.path;
						return (
							<Link
								key={item.path}
								href={item.path}
								onClick={() => {
									if (window.innerWidth < 768) setSidebarOpen(false);
								}}
								className={cn(
									"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
									active
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
								)}
							>
								<item.icon className="h-4 w-4" />
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div className="p-4 border-t border-border text-xs text-muted-foreground whitespace-nowrap">
					AI Predictive Maintenance v1.0
				</div>
			</aside>

			{/* Main content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Top Navbar */}
				<header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 h-14 bg-card/80 backdrop-blur-sm border-b border-border">
					<button
						className="md:hidden p-2 -ml-2 text-foreground"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						{sidebarOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
					{!sidebarOpen && (
						<button
							className="hidden md:flex items-center gap-2 p-2 -ml-2 text-foreground hover:text-primary transition-colors"
							onClick={() => setSidebarOpen(true)}
						>
							<Activity className="h-5 w-5 text-primary" />
							<span className="font-heading font-semibold text-sm">
								PredictAI
							</span>
						</button>
					)}
					<h1 className="font-heading font-semibold text-foreground hidden md:block">
						Predictive Maintenance Dashboard
					</h1>
					<div className="flex items-center gap-2">
						<span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
							Admin
						</span>
						<button
							onClick={handleLogout}
							className="p-2 text-muted-foreground hover:text-foreground transition-colors"
							title="Logout"
						>
							<LogOut className="h-4 w-4" />
						</button>
					</div>
				</header>

				<main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
