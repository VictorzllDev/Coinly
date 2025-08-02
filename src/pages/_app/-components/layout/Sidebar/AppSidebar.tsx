import { IconDashboard, IconListDetails, IconSettings } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { WalletIcon } from 'lucide-react'
import type * as React from 'react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/auth/useAuth'
import { NavMain } from './NavMain'
import { NavSecondary } from './NavSecondary'
import { NavUser } from './NavUser'

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/',
			icon: IconDashboard,
		},
		{
			title: 'Transações',
			url: '/transaction',
			icon: IconListDetails,
		},
	],
	navSecondary: [
		{
			title: 'Configurações',
			url: '.',
			icon: IconSettings,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth()
	if (!user) throw new Error('User not found')

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
							<Link to="/">
								<WalletIcon className="size-5" />
								Coinly
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
