import * as React from "react";
import { Link } from "react-router";
import { Icon, IconifyIcon, IconProps } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary text-white shadow-xs hover:bg-brand-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      disabled: {
        true: "active:!scale-[1] cursor-not-allowed bg-grey-500",
      },
      iconOnly: {
        true: "!px-0 !min-w-[0]",
      },
      minW: {
        true: "min-w-[48px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: "sm",
        className: "w-9",
      },
      {
        iconOnly: true,
        size: "lg",
        className: "w-10",
      },
      {
        iconOnly: true,
        size: "default",
        className: "w-12",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonClasses = VariantProps<typeof buttonVariants>;

type AsProp = React.ElementType | React.ComponentType<any>;

type ButtonProps<T extends AsProp = "button"> = {
  as?: T;
  icon?: IconifyIcon | string;
  iconPosition?: "left" | "right";
  iconProps?: Partial<IconProps>;
  loading?: boolean;
  className?: string;
  doubleBorderWidth?: string;
  doubleBorderColor?: string;
  extraPropsDouble?: string;
  suffix?: React.ReactNode;
  doubleSize?: "sm" | "lg";
} & React.ComponentProps<"button" | typeof Link> &
  Omit<ButtonClasses, "minW">;

function Button<T extends AsProp = "button">(props: ButtonProps<T>) {
  const {
    as = "button",
    iconProps = {},
    iconPosition,
    disabled,
    iconOnly,
    icon,
    loading = false,
    children,
    variant,
    className,
    size,
    suffix,
    ...rest
  } = props;

  const evaluatedProps = {
    className: cn(
      buttonVariants({
        variant,
        size,
        disabled: disabled || loading,
        iconOnly,
        minW: !className?.includes("h-"),
      }),
      className
    ),
    disabled: disabled || loading,
    ...rest,
  };

  const renderedIcon = icon ? <Icon {...iconProps} icon={icon} /> : null;

  return React.createElement(
    as,
    evaluatedProps as React.ComponentProps<typeof Link>,
    iconPosition === "left" && !loading && icon ? renderedIcon : null,
    iconOnly && icon && !loading ? renderedIcon : null,
    loading ? (
      <Icon icon="hugeicons:loading-03" className="animate-spin text-xl" />
    ) : null,
    !loading ? children : null,
    iconPosition === "right" && !loading && icon ? renderedIcon : null,
    suffix
  );
}

function DoubleButton<T extends AsProp = "button">(props: ButtonProps<T>) {
  const {
    as = "button",
    iconProps = {},
    iconPosition,
    doubleBorderWidth = 2,
    doubleBorderColor = "brand-primary",
    extraPropsDouble,
    doubleSize = "h-10",
    disabled,
    iconOnly,
    icon,
    loading = false,
    children,
    variant,
    className,
    size,
    suffix,
    ...rest
  } = props;

  const evaluatedProps = {
    className: cn(
      buttonVariants({
        variant,
        size,
        disabled: disabled || loading,
        iconOnly,
        minW: !className?.includes("h-"),
      }),
      "text-sm text-white font-bold leading-6 rounded-none group w-full py-2 px-4 relative cursor-pointer",
      className
    ),
    disabled: disabled || loading,
    ...rest,
  };

  // const renderedIcon = icon ? icon : null;

  const Component = as as React.ElementType;

  return (
    <div className="relative w-full">
      {/* Double border styling */}
      <div
        className={cn(
          `absolute inset-0 border-${doubleBorderWidth} border-${doubleBorderColor} ${doubleSize} pointer-events-none`,
          disabled || loading
            ? "active:!scale-[1] cursor-not-allowed border-grey-500 opacity-70"
            : "",
          extraPropsDouble
        )}
        style={{ transform: "translate(4px, 4px)" }}
      />

      <Component {...evaluatedProps}>
        <div className="flex items-center justify-between gap-4">
          {iconPosition === "left" && !loading && icon ? (
            <Icon {...iconProps} icon={icon} />
          ) : null}
          {iconOnly && icon && !loading ? (
            <Icon {...iconProps} icon={icon} />
          ) : null}

          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            </div>
          ) : null}
          {/* Fix for text disappearing on small screens */}
          <span className="block whitespace-nowrap">
            {typeof children === "string" ? children : null}
          </span>

          {iconPosition === "right" && !loading && icon ? (
            <Icon {...iconProps} icon={icon} />
          ) : null}
          {suffix}
        </div>
      </Component>
    </div>
  );
}

export { Button, DoubleButton, buttonVariants };
