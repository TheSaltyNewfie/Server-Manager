import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface Container {
	Names: [];
	Status: string;
	Image: string;
}
