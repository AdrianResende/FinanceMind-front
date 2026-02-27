import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean }
>(({ className, children, open, ...props }, ref) => {
  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))

DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
))

DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator }
