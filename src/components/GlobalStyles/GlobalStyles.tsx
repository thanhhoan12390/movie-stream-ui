import './GlobalStyles.scss';
import '~/assets/css/grid.css';

interface GlobalStylesProps {
    children: JSX.Element;
}

function GlobalStyles({ children }: GlobalStylesProps) {
    return children;
}

export default GlobalStyles;
