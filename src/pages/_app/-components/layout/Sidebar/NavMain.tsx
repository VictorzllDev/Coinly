import type { Icon } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon?: Icon
	}[]
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<Separator />
				<SidebarMenu>
					{items.map((item) => (
						<Link key={item.title} to={item.url}>
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</Link>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
