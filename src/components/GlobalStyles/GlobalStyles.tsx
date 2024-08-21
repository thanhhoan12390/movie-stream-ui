import './GlobalStyles.scss';

interface GlobalStylesProps {
    children: JSX.Element;
}

function GlobalStyles({ children }: GlobalStylesProps) {
    return children;
}

export default GlobalStyles;
