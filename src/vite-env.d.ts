/// <reference types="vite/client" />
/// <reference types="@figma/widget-typings" />

// Добавляем глобальные типы Figma
declare global {
	const figma: {
		widget: WidgetAPI
	}
	const __html__: string
}

export {}
