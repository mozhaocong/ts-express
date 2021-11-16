import { stringify } from '@/puppeteerCore/util/data'

export function main() {
	global.stringify = stringify
}
