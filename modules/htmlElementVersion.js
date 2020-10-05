export const getHTMLElementVersion = imports => {

	const {
		require: {
			instanceId,
			hashify,
			patch,
			html,
			note,
			count,
			modal,
			decryptKnown,
			captureError
		}
	} = imports

	return new Promise(async resolve => {
		try {
			const id = `${instanceId}-html-element-version-test`
			const element = document.createElement('div')
			element.setAttribute('id', id)
			document.body.appendChild(element) 
			const htmlElement = document.getElementById(id)
			const keys = []
			for (const key in htmlElement) {
				keys.push(key)
			}
			const $hash = await hashify(keys)
			resolve({ keys, $hash })
			const elId = 'creep-html-element-version'
			const el = document.getElementById(elId)
			patch(el, html`
			<div>
				<strong>HTMLElement</strong>
				<div class="ellipsis">hash: ${$hash}</div>
				<div class="ellipsis">browser: ${decryptKnown($hash)}</div>
				<div>keys (${count(keys)}): ${keys && keys.length ? modal(elId, keys.join(', ')) : note.blocked}</div>
			</div>
			`)
			return
		}
		catch (error) {
			captureError(error)
			return resolve(undefined)
		}
	})
}