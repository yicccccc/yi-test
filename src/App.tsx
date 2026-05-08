import React, {useState} from 'react';
import './App.scss';
import Checker from './Components/Main/Checker';
import { FeedbackData, GeneralFeedbackData } from './Types';
import { Text } from './Parser/Parser';
import { Route, Switch, Link } from 'react-router-dom';
import ReportPanelList from './Components/Main/ReportPanelList';
import GeneralCommentsList from './Components/Main/GeneralCommentsList';
import { validateAbbreviationsCount, validateExampleCount, validateTransitionWordsCount } from './Parser/Validator/WordCounterValidator';
import BundleTimingChart from './Components/Main/BundleTimingChart';

function App(): JSX.Element {
	const [specificFeedbackList, setSpecificFeedbackList] = useState<FeedbackData[]>([]);
	const [generalFeedbackList, setGeneralFeedbackList] = useState<GeneralFeedbackData[]>([]);
	const [parsedTextState, setParsedTextState] = useState<Text>();
	const [showResult, setShowResult] = useState<boolean>(false);

	const onClickSubmit = (article: string) => {
		// @ts-ignore
		window.uetq = window.uetq || [];
		// @ts-ignore
     		window.uetq.push('event', 'purchase', {"event_label":"purchase_label","event_value":14,"event_category":"purchase_category","revenue_value":1.22,"currency":"USD"});
		setShowResult(true);
		const parsedText = new Text(article);

		// Look for Feedback
		parsedText.parseText();
		setParsedTextState(parsedText);

		const list: FeedbackData[] = parsedText.getFeedback();
		setSpecificFeedbackList(list);

		// Check that examples and transition words are used
		const examplesFeedback = validateExampleCount(parsedText.getExamplesCount(), parsedText.getParagraphsCount());
		const transitionWordsFeedback = validateTransitionWordsCount(parsedText.getTransitionWordsCount(), parsedText.getParagraphsCount());
		const abbreviationsFeedback = validateAbbreviationsCount(parsedText.getAbbreviationsCount(), parsedText.getParagraphsCount());
		setGeneralFeedbackList([examplesFeedback, transitionWordsFeedback, abbreviationsFeedback]);
	};

	return (
		<div className="App">
			<div className='container'>
				<nav style={{ marginBottom: '1rem' }}>
					<Link to="/" style={{ marginRight: '1rem' }}>Plain Language Checker</Link>
					<Link to="/bundle-timing">Bundle Timing Chart</Link>
				</nav>
				<Switch>
					<Route exact path="/">
						<div role={'main'}>
							<Checker
								onClickSubmit={onClickSubmit}
							/>
							{
								showResult && specificFeedbackList &&
							<ReportPanelList
								items={specificFeedbackList}
								paragraphs={parsedTextState?.getParagraphs()}
							/>
							}
							{showResult && generalFeedbackList && <GeneralCommentsList items={generalFeedbackList}/>}
						</div>
					</Route>
					<Route path="/bundle-timing">
						<BundleTimingChart />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
