import {renderToString} from 'react-dom/server';
import App from './client/components/App';

export default function render(ctx) {

		const appString = renderToString( < App /> );
		ctx.body = `<html>
									<head>
										<meta charset="utf-8">
										<link rel="shortcut icon" href="/public/favicon.ico">
										<link rel="stylesheet" href="style.css">
										<title>Hello, Node School App!</title>
									</head>
									<body>
										<div id="root">${appString}</div>
										<script src="bundle.js"></script>
									</body>
								</html>
								`;
	}
