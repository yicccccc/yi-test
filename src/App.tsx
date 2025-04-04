import React, {useState} from 'react';
import './App.scss';
import Checker from './Components/Main/Checker';
import { FeedbackData, GeneralFeedbackData } from './Types';
import { Text } from './Parser/Parser';
import { Route, Switch } from 'react-router-dom';
import ReportPanelList from './Components/Main/ReportPanelList';
import GeneralCommentsList from './Components/Main/GeneralCommentsList';
import { validateAbbreviationsCount, validateExampleCount, validateTransitionWordsCount } from './Parser/Validator/WordCounterValidator';

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
				<Switch>
					<Route exact path="/"/>
				</Switch>
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
			</div>
		</div>
	);
}

export default App;
