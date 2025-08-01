import { type Icon, IconCirclePlusFilled } from '@tabler/icons-react'
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
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							tooltip="New Transaction"
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
						>
							<IconCirclePlusFilled />
							<span>Nova Transacao</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
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
