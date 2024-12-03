import { readFileSync } from 'fs';

export const readFromFile = (file) => {
	return readFileSync(file, 'utf8');
}

export const getArgs = (args: string[]) => {
	return args.map(arg => arg.split('=')).splice(2).map(([key, value]) => ({[key.replaceAll('-', '')]: value || true})).reduce((acc, arg) => ({...acc, ...arg}), {});
}