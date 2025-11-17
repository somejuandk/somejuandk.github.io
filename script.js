 // --- App State ---
        let analyzerData = [];
        let processedAnalyzerData = [];
        let correlationChart1 = null;
        let correlationChart2 = null;
        let simulationSpendTransactionsChart = null;
        let simulationScatterChart = null;
        let simulationRevenueChart = null;
        let simulationCpaChart = null;
        let simulationFutureRevenueChart = null;
        let simulationFutureCpaChart = null;
        let correlationTimeAggregation = 'Daily';
        let simulationTimeAggregation = 'Daily';
        let bestWorstTimeAggregation = 'Daily';
        let graphAnalysisTimeAggregation = 'Weekly';
        let analyzerDashboardTimeAggregation = 'Daily';
        let granulationMode = 'monthOverMonth';
        let analyzerDashboardCharts = {};
        let metricDetailChart = null;
        let graphAnalysisCharts = {};
        let graphAnalysisChartTypes = {};
        let graphAnalysisCleanConfigs = {};
        let enlargedChart = null;
        let shopifyData = [], metaCorrelationsData = [], googleCorrelationsData = [];
        let backendCorrelationOrdersChart = null;
        let backendCorrelationMetricChart = null;
        let unfilteredAlignedBackendData = [], alignedBackendData = [];
        let backendCorrelationPeriodType = 'all';
        let currentMetricDetail = null;

        let notificationTimeout;

        // --- File Library State ---
        let fileLibrary = [];
        let selectedFileFromLibrary = null;
        window.fileHandlers = {}; // Global registry for app-specific file handlers

        const APP_INFO = {
            'dashboard': {
                title: 'Dashboard',
                icon: `<svg class="w-8 h-8 text-[#5248e2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 8.5V15.5L12 22L22 15.5V8.5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M2 8.5L12 12L22 8.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`
            },
            'analyzer': {
                title: 'Performance Analyzer',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"></path></svg>`
            },
            'tools': {
                title: 'Tools',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a.563.563 0 0 1 .801 0l3.744 3.744a.563.563 0 0 1 0 .801l-2.471 2.471m0 0-.566.566a2.25 2.25 0 0 1-3.182 0l-1.485-1.485A2.25 2.25 0 0 1 6.5 13.5v-1.5a.563.563 0 0 1 .563-.563h1.5a2.25 2.25 0 0 1 2.25 2.25v5.877a2.652 2.652 0 0 0-2.652-2.652h-1.5a.563.563 0 0 0-.563.563v1.5a2.25 2.25 0 0 0 2.25 2.25h1.5m-3-9.477A2.25 2.25 0 0 1 8 3.75v-1.5a.563.563 0 0 1 .563-.563h1.5a2.25 2.25 0 0 1 2.25 2.25v1.5" /></svg>`
            },
            'backend-correlations': {
                title: 'Backend Correlations',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>`
            },
            'budget-pacer': {
                title: 'Budget Pacer',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
            },
            'simulator': {
                title: 'Performance Simulator',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.684-2.684L11.25 18l1.938-.648a3.375 3.375 0 002.684-2.684L16.25 13.5l.648 1.938a3.375 3.375 0 002.684 2.684L21.75 18l-1.938.648a3.375 3.375 0 00-2.684 2.684z"></path></svg>`
            },
            'incremental-reach': {
                title: 'Incremental Reach',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>`
            },
            'roas-goal-setter': {
                title: 'ROAS Goal Setter',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M3 11l19-9-9 19-2-8-8-2z" /></svg>`
            },
            'pitch-assistant': {
                title: 'Pitch Assistant',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-[#5248e2] shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h16.5M3.75 3v1.5M16.5 3v1.5M3.75 16.5h16.5M16.5 16.5v3.75A2.25 2.25 0 0114.25 22.5h-4.5A2.25 2.25 0 017.5 20.25V16.5" /></svg>`
            },
        };

        // --- DOM Elements ---
        const DOM = {
            dashboardView: document.getElementById('dashboard-view'),
            appContainer: document.getElementById('app'),
            tooltip: document.getElementById('tooltip'),
            topBarNotification: document.getElementById('top-bar-notification'),
            mainContent: document.getElementById('main-content'),
            darkModeToggle: document.getElementById('dark-mode-toggle'),
            darkModeCheckbox: document.getElementById('dark-mode-checkbox'),
            screenshotModeToggle: document.getElementById('screenshot-mode-toggle'),
            screenshotModeCheckbox: document.getElementById('screenshot-mode-checkbox'),
            mainHeaderIcon: document.getElementById('main-header-icon'),
            mainHeaderTitle: document.getElementById('main-header-title'),
            appSwitcher: {
                modal: document.getElementById('app-switcher-modal'),
                backdrop: document.getElementById('app-switcher-backdrop'),
                closeBtn: document.getElementById('app-switcher-close'),
                nav: document.getElementById('app-switcher-nav'),
                greetingContainer: document.getElementById('app-switcher-greeting'),
                greetingText: document.getElementById('app-switcher-greeting-text'),
                greetingPosition: document.getElementById('app-switcher-user-position-text'),
            },
            status: {
                system: document.getElementById('status-system'),
                storage: document.getElementById('status-storage'),
                scripts: document.getElementById('status-scripts'),
            },
            analyzer: {
                view: document.getElementById('analyzer-view'),
                sidebar: document.getElementById('analyzer-sidebar'),
                mainContent: document.getElementById('analyzer-main-content'),
                menuOpenBtn: document.getElementById('menu-open-btn-analyzer'),
                fileInput: document.getElementById('meta-file-input'),
                dropZone: document.getElementById('file-drop-zone'),
                summaryContainer: document.getElementById('analyzer-summary'),
                controlsContainer: document.getElementById('analyzer-controls'),
                resultsContainer: document.getElementById('analyzer-results'),
                correlationsBtn: document.getElementById('correlations-btn'),
                simulationBtn: document.getElementById('simulation-btn'),
                bestWorstBtn: document.getElementById('best-worst-btn'),
                graphAnalysisBtn: document.getElementById('graph-analysis-btn'),
                granulateBtn: document.getElementById('granulate-btn'),
            },
            tools: {
                view: document.getElementById('tools-view'),
                mainContent: document.getElementById('tools-main-content'),
                timeDayConverterBtn: document.getElementById('time-day-converter-btn'),
                percentageCalculatorBtn: document.getElementById('percentage-calculator-btn'),
                schreiberToolBtn: document.getElementById('schreiber-tool-btn'),
            },
            backendCorrelations: {
                view: document.getElementById('backend-correlations-view'),
                shopifyDropZone: document.getElementById('shopify-drop-zone'),
                metaDropZone: document.getElementById('meta-correlations-drop-zone'),
                googleDropZone: document.getElementById('google-correlations-drop-zone'),
                shopifyFileInput: document.getElementById('shopify-file-input'),
                metaFileInput: document.getElementById('meta-correlations-file-input'),
                googleFileInput: document.getElementById('google-correlations-file-input'),
                shopifyFileStatus: document.getElementById('shopify-file-status'),
                metaFileStatus: document.getElementById('meta-correlations-file-status'),
                googleFileStatus: document.getElementById('google-correlations-file-status'),
                filtersContainer: document.getElementById('backend-correlations-filters'),
                periodTypeControls: document.getElementById('backend-correlations-period-type'),
                periodSelectContainer: document.getElementById('backend-correlations-period-select-container'),
                resultsContainer: document.getElementById('backend-correlations-results'),
                metricSelect: document.getElementById('backend-metric-select'),
                correlationValue: document.getElementById('backend-correlation-value'),
                correlationMarker: document.getElementById('backend-correlation-marker'),
                metaCorrelationContainer: document.getElementById('meta-correlation-container'),
                metaCorrelationValue: document.getElementById('meta-correlation-value'),
                metaCorrelationMarker: document.getElementById('meta-correlation-marker'),
                googleCorrelationContainer: document.getElementById('google-correlation-container'),
                googleCorrelationValue: document.getElementById('google-correlation-value'),
                googleCorrelationMarker: document.getElementById('google-correlation-marker'),
                ordersChartCanvas: document.getElementById('backend-orders-chart'),
                metricChartCanvas: document.getElementById('backend-metric-chart'),
                tableContainer: document.getElementById('backend-correlation-table-container'),
            },
             budgetPacer: {
                view: document.getElementById('budget-pacer-view'),
            },
            simulator: {
                view: document.getElementById('simulator-view'),
            },
            incrementalReach: {
                view: document.getElementById('incremental-reach-view'),
            },
            roasGoalSetter: {
                view: document.getElementById('roas-goal-setter-view'),
            },
            pitchAssistant: {
                view: document.getElementById('pitch-assistant-view'),
            },
            analyzerDashboard: {
                content: document.getElementById('analyzer-dashboard-content'),
                timeAggControls: document.getElementById('analyzer-dashboard-time-aggregation-controls'),
                scatterCanvas: document.getElementById('analyzer-scatter-chart'),
                spendCanvas: document.getElementById('analyzer-spend-chart'),
                top5Container: document.getElementById('analyzer-top5-container'),
                top5MetricSelect: document.getElementById('analyzer-top5-metric-select'),
                top5TableWrapper: document.getElementById('analyzer-top5-table-wrapper'),
            },
             correlationsModal: {
                modal: document.getElementById('correlations-modal'),
                backdrop: document.getElementById('correlations-backdrop'),
                content: document.getElementById('correlations-content'),
                closeBtn: document.getElementById('correlations-close-btn'),
                metric1Select: document.getElementById('metric1-select'),
                metric2Select: document.getElementById('metric2-select'),
                value: document.getElementById('correlation-value'),
                marker: document.getElementById('correlation-marker'),
                chart1Canvas: document.getElementById('metric1-chart'),
                chart2Canvas: document.getElementById('metric2-chart'),
                timeAggControls: document.getElementById('time-aggregation-controls'),
                dataPeriodIndicator: document.getElementById('data-period-indicator'),
            },
            simulationModal: {
                modal: document.getElementById('simulation-modal'),
                backdrop: document.getElementById('simulation-backdrop'),
                content: document.getElementById('simulation-content'),
                closeBtn: document.getElementById('simulation-close-btn'),
                spendSlider: document.getElementById('spend-increase-slider'),
                spendValue: document.getElementById('spend-increase-value'),
                eventMapper: document.getElementById('simulation-event-mapper'),
                resultsTable: document.getElementById('simulation-results-table'),
                spendTransactionsChartCanvas: document.getElementById('simulation-spend-transactions-chart'),
                scatterPlotCanvas: document.getElementById('simulation-scatter-plot'),
                revenueChartCanvas: document.getElementById('simulation-revenue-chart'),
                cpaChartCanvas: document.getElementById('simulation-cpa-chart'),
                futureRevenueChartCanvas: document.getElementById('simulation-future-revenue-chart'),
                futureCpaChartCanvas: document.getElementById('simulation-future-cpa-chart'),
                timeAggControls: document.getElementById('simulation-time-aggregation-controls'),
            },
            bestWorstModal: {
                modal: document.getElementById('best-worst-modal'),
                backdrop: document.getElementById('best-worst-backdrop'),
                content: document.getElementById('best-worst-content'),
                closeBtn: document.getElementById('best-worst-close-btn'),
                metricSelect: document.getElementById('best-worst-metric-select'),
                resultsContainer: document.getElementById('best-worst-results-container'),
                timeAggControls: document.getElementById('best-worst-time-aggregation-controls'),
            },
            granulateModal: {
                modal: document.getElementById('granulate-modal'),
                backdrop: document.getElementById('granulate-backdrop'),
                content: document.getElementById('granulate-content'),
                closeBtn: document.getElementById('granulate-close-btn'),
                modeToggle: document.getElementById('granulate-mode-toggle'),
                selectorsContainer: document.getElementById('granulate-selectors-container'),
                resultsContainer: document.getElementById('granulate-results-container'),
            },
            metricChartModal: {
                modal: document.getElementById('metric-chart-modal'),
                backdrop: document.getElementById('metric-chart-backdrop'),
                content: document.getElementById('metric-chart-content'),
                closeBtn: document.getElementById('metric-chart-close-btn'),
                title: document.getElementById('metric-chart-title'),
                canvas: document.getElementById('metric-chart-canvas'),
            },
            graphAnalysisModal: {
                 modal: document.getElementById('graph-analysis-modal'),
                 backdrop: document.getElementById('graph-analysis-backdrop'),
                 content: document.getElementById('graph-analysis-content'),
                 closeBtn: document.getElementById('graph-analysis-close-btn'),
                 grid: document.getElementById('graph-analysis-grid'),
                 timeAggControls: document.getElementById('graph-analysis-time-aggregation-controls'),
            },
            enlargeChartModal: {
                modal: document.getElementById('enlarge-chart-modal'),
                backdrop: document.getElementById('enlarge-chart-backdrop'),
                content: document.getElementById('enlarge-chart-content'),
                closeBtn: document.getElementById('enlarge-chart-close-btn'),
                title: document.getElementById('enlarge-chart-title'),
                canvas: document.getElementById('enlarged-chart-canvas'),
            },
            fileLibraryModal: {
                modal: document.getElementById('file-library-modal'),
                backdrop: document.getElementById('file-library-backdrop'),
                content: document.getElementById('file-library-content'),
                closeBtn: document.getElementById('file-library-close-btn'),
                list: document.getElementById('file-library-list'),
                useBtn: document.getElementById('use-file-btn'),
                btn: document.getElementById('file-library-btn')
            },
            timeDayConverterModal: {
                modal: document.getElementById('time-day-converter-modal'),
                backdrop: document.getElementById('time-day-converter-backdrop'),
                closeBtn: document.getElementById('time-day-converter-close-btn'),
            },
            percentageCalculatorModal: {
                modal: document.getElementById('percentage-calculator-modal'),
                backdrop: document.getElementById('percentage-calculator-backdrop'),
                closeBtn: document.getElementById('percentage-calculator-close-btn'),
            },
            schreiberToolModal: {
                modal: document.getElementById('schreiber-tool-modal'),
                backdrop: document.getElementById('schreiber-tool-backdrop'),
                closeBtn: document.getElementById('schreiber-tool-close-btn'),
            },
        };

        // --- UI Helpers ---
        function throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
        
        function showNotification(message, type = 'info') {
            const notificationEl = DOM.topBarNotification;
            if (!notificationEl) return;
        
            // Remove old type classes
            notificationEl.classList.remove('notification-info', 'notification-success', 'notification-error');
            
            // Add new type class
            notificationEl.classList.add(`notification-${type}`);
            
            notificationEl.textContent = message;
            // The 'active' class will control visibility and animation
            notificationEl.classList.add('active');
        
            // Clear any existing timeout to reset the display timer
            clearTimeout(notificationTimeout);
        
            // Set a new timeout to hide the notification
            notificationTimeout = setTimeout(() => {
                notificationEl.classList.remove('active');
            }, 3000);
        }

        function formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
        }

        function getThemeColors() {
            const isDarkMode = document.documentElement.classList.contains('dark');
            return {
                // Brand Colors
                primary: isDarkMode ? '#818cf8' : '#5248e2', // indigo-400 for dark, signature purple for light
                primaryRgba: isDarkMode ? 'rgba(129, 140, 248, 0.25)' : 'rgba(82, 72, 226, 0.25)',
                primaryRgba_Scatter: isDarkMode ? 'rgba(129, 140, 248, 0.7)' : 'rgba(82, 72, 226, 0.6)',
                primaryRgba_Bar: isDarkMode ? 'rgba(129, 140, 248, 0.75)' : 'rgba(82, 72, 226, 0.7)',
        
                secondary: isDarkMode ? '#2DD4BF' : '#0891B2', // Bright teal for dark, vibrant cyan for light
                secondaryRgba: isDarkMode ? 'rgba(45, 212, 191, 0.25)' : 'rgba(8, 145, 178, 0.25)',
                
                accent: isDarkMode ? '#fcd34d' : '#f59e0b', // amber-300 for dark, amber-500 for light
                accentRgba: isDarkMode ? 'rgba(252, 211, 77, 0.2)' : 'rgba(245, 158, 11, 0.2)',

                danger: isDarkMode ? '#FB7185' : '#BE123C', // Bright rose for dark, strong rose for light
                dangerRgba: isDarkMode ? 'rgba(251, 113, 133, 0.25)' : 'rgba(190, 18, 60, 0.25)',
                dangerRgba_Bar: isDarkMode ? 'rgba(251, 113, 133, 0.7)' : 'rgba(190, 18, 60, 0.6)',
        
                // Chart UI
                grid: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0,0,0,0.1)',
                ticks: isDarkMode ? '#d1d5db' : '#6b7280',
                title: isDarkMode ? '#f9fafb' : '#1f2328',
                legend: isDarkMode ? '#d1d5db' : '#4b5563',
            };
        }

        function rerenderAllVisibleCharts() {
            // Main analyzer dashboard
            if (!DOM.analyzerDashboard.content.classList.contains('hidden')) {
                renderAnalyzerDashboard();
            }
            // Correlations Modal
            if (DOM.correlationsModal.modal.classList.contains('flex')) {
                calculateAndRenderCorrelation();
            }
            // Simulation Modal
            if (DOM.simulationModal.modal.classList.contains('flex')) {
                runSimulation();
            }
            // Graph Analysis Modal
            if (DOM.graphAnalysisModal.modal.classList.contains('flex')) {
                renderAllAnalysisGraphs();
            }
            // Granulation -> Metric Detail Modal
            if (DOM.metricChartModal.modal.classList.contains('flex') && currentMetricDetail) {
                renderMetricComparisonChart(currentMetricDetail);
            }
            // Backend Correlations
            if (!DOM.backendCorrelations.resultsContainer.classList.contains('hidden')) {
                processAndRenderBackendCorrelations();
            }
            // Enlarged Chart Modal
            if (DOM.enlargeChartModal.modal.classList.contains('flex')) {
                hideEnlargedChart();
                showNotification('Chart view was reset to apply theme.', 'info');
            }
        }

        function updateHeader(appName) {
            const info = APP_INFO[appName] || APP_INFO['dashboard'];
            DOM.mainHeaderIcon.innerHTML = info.icon;
            DOM.mainHeaderTitle.textContent = info.title;
        }

        function updateStatusIndicator(element, isSuccess, tooltipText) {
            if (!element) return;
            const successIcon = element.querySelector('.status-icon-success');
            const failureIcon = element.querySelector('.status-icon-failure');
            
            element.classList.remove('status-success', 'status-failure');
            successIcon.classList.add('hidden');
            failureIcon.classList.add('hidden');
        
            if (isSuccess) {
                element.classList.add('status-success');
                successIcon.classList.remove('hidden');
            } else {
                element.classList.add('status-failure');
                failureIcon.classList.remove('hidden');
            }
            element.dataset.tooltip = tooltipText;
        }
        
        function runStatusChecks() {
            let allSystemsGo = true;
        
            // 1. Check Scripts Loaded
            // This function is called from DOMContentLoaded, so scripts are considered loaded.
            updateStatusIndicator(DOM.status.scripts, true, 'Scripts: Loaded Successfully');
        
            // 2. Check Local Storage
            try {
                const testKey = 'lnc_storage_test';
                localStorage.setItem(testKey, 'ok');
                localStorage.removeItem(testKey);
                updateStatusIndicator(DOM.status.storage, true, 'Local Storage: Operational');
            } catch (e) {
                updateStatusIndicator(DOM.status.storage, false, 'Local Storage: Not Available');
                allSystemsGo = false;
            }
        
            // 3. Check Overall System Status
            if (allSystemsGo) {
                updateStatusIndicator(DOM.status.system, true, 'Overall System: All systems operational');
            } else {
                updateStatusIndicator(DOM.status.system, false, 'Overall System: One or more systems have issues');
            }
        }
        
        // --- File Library Logic ---
        function addToFileLibrary(fileObject) {
            fileObject.id = `file_${Date.now()}_${Math.random()}`;
            const existingIndex = fileLibrary.findIndex(f => f.name === fileObject.name && f.context === fileObject.context);
            if (existingIndex > -1) {
                fileLibrary[existingIndex] = fileObject;
            } else {
                fileLibrary.push(fileObject);
            }

            if (DOM.fileLibraryModal.btn.classList.contains('hidden')) {
                DOM.fileLibraryModal.btn.classList.remove('hidden');
                setTimeout(() => {
                    DOM.fileLibraryModal.btn.classList.remove('opacity-0');
                }, 10);
            }
        }

        function openFileLibraryModal() {
            populateFileLibraryList();
            DOM.fileLibraryModal.modal.classList.replace('hidden', 'flex');
            setTimeout(() => {
                DOM.fileLibraryModal.backdrop.classList.add('open');
                DOM.fileLibraryModal.content.classList.add('open');
            }, 10);
        }

        function closeFileLibraryModal() {
            DOM.fileLibraryModal.backdrop.classList.remove('open');
            DOM.fileLibraryModal.content.classList.remove('open');
            setTimeout(() => {
                DOM.fileLibraryModal.modal.classList.replace('flex', 'hidden');
                selectedFileFromLibrary = null;
                DOM.fileLibraryModal.useBtn.disabled = true;
                const currentlySelected = DOM.fileLibraryModal.list.querySelector('.selected');
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected');
                }
            }, 300);
        }
        
        function populateFileLibraryList() {
            const listEl = DOM.fileLibraryModal.list;
            if (fileLibrary.length === 0) {
                listEl.innerHTML = '<p class="text-gray-500 text-center py-8">No files uploaded in this session.</p>';
                return;
            }

            listEl.innerHTML = fileLibrary.map((file) => `
                <div data-file-id="${file.id}" class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <p class="font-medium text-gray-800 dark:text-gray-200 pointer-events-none">${file.name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 pointer-events-none">Source: ${file.context}</p>
                </div>
            `).join('');
        }

        function handleFileLibrarySelection(e) {
            const selectedItem = e.target.closest('[data-file-id]');
            if (!selectedItem) return;

            const currentlySelected = DOM.fileLibraryModal.list.querySelector('.selected');
            if (currentlySelected) {
                currentlySelected.classList.remove('selected');
            }

            selectedItem.classList.add('selected');
            const fileId = selectedItem.dataset.fileId;
            selectedFileFromLibrary = fileLibrary.find(f => f.id === fileId);

            DOM.fileLibraryModal.useBtn.disabled = false;
        }

        function getActiveApp() {
            for (const view of document.querySelectorAll('.main-view')) {
                if (!view.classList.contains('is-inactive')) {
                    return view.id.replace('-view', '');
                }
            }
            return 'dashboard';
        }
        
        function useSelectedFile() {
            if (!selectedFileFromLibrary) return;
            const activeApp = getActiveApp();
            let fileUsed = false;
        
            const handler = window.fileHandlers[activeApp];
            if (handler) {
                handler(selectedFileFromLibrary.content, selectedFileFromLibrary.name);
                fileUsed = true;
            } else if (activeApp === 'backend-correlations' && typeof handleCorrelationFile === 'function') {
                let fileType = '';
                const nameLower = selectedFileFromLibrary.name.toLowerCase();
                const contextLower = selectedFileFromLibrary.context.toLowerCase();
        
                if (nameLower.includes('shopify') || contextLower.includes('shopify')) fileType = 'shopify';
                else if (nameLower.includes('meta') || contextLower.includes('meta')) fileType = 'meta';
                else if (nameLower.includes('google') || contextLower.includes('google')) fileType = 'google';
                
                if (fileType) {
                    const file = new File([selectedFileFromLibrary.content], selectedFileFromLibrary.name, {type: "text/csv"});
                    handleCorrelationFile(file, fileType);
                    fileUsed = true;
                } else {
                    showNotification(`Could not determine file type (Shopify, Meta, Google) for this file. Please upload manually.`, 'error');
                }
            } else {
                showNotification(`File library is not supported for the '${activeApp}' app.`, 'info');
            }
            
            if (fileUsed) {
                showNotification(`Using '${selectedFileFromLibrary.name}' in ${APP_INFO[activeApp].title}.`, 'success');
                closeFileLibraryModal();
            }
        }


        // --- Core Application Logic ---
        function showDashboardView() {
            // Hide all app views
            document.querySelectorAll('.main-view').forEach(view => view.classList.add('is-inactive'));
            
            // Show dashboard
            DOM.dashboardView.classList.remove('is-inactive');
            updateHeader('dashboard');

            // Reset specific app layouts
            DOM.analyzer.sidebar.classList.remove('visible');
            DOM.analyzer.mainContent.style.transform = 'translateX(0)';
        }
        
        function switchApp(appName) {
            // Hide all main views
            document.querySelectorAll('.main-view').forEach(view => view.classList.add('is-inactive'));

            // Reset specific app layouts by default
            DOM.analyzer.sidebar.classList.remove('visible');
            DOM.analyzer.mainContent.style.transform = 'translateX(0)';
            DOM.tools.mainContent.style.marginRight = '0';

            // Update header for new app
            updateHeader(appName);

            // Show the selected app's main view
            const view = document.getElementById(`${appName}-view`);
            if (view) {
                view.classList.remove('is-inactive');
            }

            // Apply specific layouts
            if (appName === 'analyzer') {
                DOM.analyzer.sidebar.classList.add('visible');
                DOM.analyzer.mainContent.style.transform = `translateX(21rem)`;
            }

            // Update app switcher button styles
            DOM.appSwitcher.nav.querySelectorAll('a').forEach(a => {
                a.classList.toggle('active', a.dataset.app === appName);
            });
            
            hideAppSwitcher();
        }
        
        function setupTooltips() {
            DOM.appContainer.addEventListener('mouseover', e => {
                const target = e.target.closest('[data-tooltip]');
                if (target) {
                    DOM.tooltip.textContent = target.dataset.tooltip;
                    DOM.tooltip.classList.remove('hidden');
                }
            });
            DOM.appContainer.addEventListener('mouseout', e => {
                if (e.target.closest('[data-tooltip]')) DOM.tooltip.classList.add('hidden');
            });
            DOM.appContainer.addEventListener('mousemove', e => {
                if (!DOM.tooltip.classList.contains('hidden')) {
                    let x = e.clientX + 15, y = e.clientY + 15;
                    if (x + DOM.tooltip.offsetWidth + 15 > window.innerWidth) x = e.clientX - DOM.tooltip.offsetWidth - 15;
                    if (y + DOM.tooltip.offsetHeight + 15 > window.innerHeight) y = e.clientY - DOM.tooltip.offsetHeight - 15;
                    DOM.tooltip.style.left = `${x}px`;
                    DOM.tooltip.style.top = `${y}px`;
                }
            });
        }

        function showAppSwitcher() {
            DOM.appSwitcher.modal.classList.replace('hidden', 'flex');
            setTimeout(() => DOM.appSwitcher.backdrop.classList.add('open'), 10);
        }

        function hideAppSwitcher() {
            DOM.appSwitcher.backdrop.classList.remove('open');
            setTimeout(() => DOM.appSwitcher.modal.classList.replace('flex', 'hidden'), 300);
        }

        function setupVibecodedMessage() {
            const messageEl = document.getElementById('vibecoded-message');
            if (!messageEl) return;
    
            setInterval(() => {
                messageEl.classList.remove('opacity-0'); // Fade in
    
                setTimeout(() => {
                    messageEl.classList.add('opacity-0'); // Fade out
                }, 4000); // Stay visible for 4 seconds
    
            }, 30000); // Appear every 30 seconds
        }

        function correl(d1, d2) {
            let { min, pow, sqrt } = Math;
            let add = (a, b) => a + b;
            let n = min(d1.length, d2.length);
            if (n < 2) return NaN;
            [d1, d2] = [d1.slice(0, n), d2.slice(0, n)];
            let [sum1, sum2] = [d1.reduce(add), d2.reduce(add)];
            let [pow1, pow2] = [d1.map(c => pow(c, 2)).reduce(add), d2.map(c => pow(c, 2)).reduce(add)];
            let mulSum = d1.map((c, i) => c * d2[i]).reduce(add);
            let dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n));
            if (dense === 0) return 0;
            return (mulSum - (sum1 * sum2 / n)) / dense;
        }

        // --- New Modal Functions ---
        function showTimeDayConverterModal() {
            DOM.timeDayConverterModal.modal.classList.replace('hidden', 'flex');
            setTimeout(() => {
                DOM.timeDayConverterModal.backdrop.classList.add('open');
                DOM.timeDayConverterModal.modal.querySelector('.modal-content').classList.add('open');
            }, 10);
        }

        function hideTimeDayConverterModal() {
            DOM.timeDayConverterModal.backdrop.classList.remove('open');
            DOM.timeDayConverterModal.modal.querySelector('.modal-content').classList.remove('open');
            setTimeout(() => DOM.timeDayConverterModal.modal.classList.replace('flex', 'hidden'), 300);
        }

        function showPercentageCalculatorModal() {
            DOM.percentageCalculatorModal.modal.classList.replace('hidden', 'flex');
            setTimeout(() => {
                DOM.percentageCalculatorModal.backdrop.classList.add('open');
                DOM.percentageCalculatorModal.modal.querySelector('.modal-content').classList.add('open');
            }, 10);
        }

        function hidePercentageCalculatorModal() {
            DOM.percentageCalculatorModal.backdrop.classList.remove('open');
            DOM.percentageCalculatorModal.modal.querySelector('.modal-content').classList.remove('open');
            setTimeout(() => DOM.percentageCalculatorModal.modal.classList.replace('flex', 'hidden'), 300);
        }

        function showSchreiberModal() {
            DOM.schreiberToolModal.modal.classList.replace('hidden', 'flex');
            setTimeout(() => {
                DOM.schreiberToolModal.backdrop.classList.add('open');
                DOM.schreiberToolModal.modal.querySelector('.modal-content').classList.add('open');
            }, 10);
        }

        function hideSchreiberModal() {
            DOM.schreiberToolModal.backdrop.classList.remove('open');
            DOM.schreiberToolModal.modal.querySelector('.modal-content').classList.remove('open');
            setTimeout(() => DOM.schreiberToolModal.modal.classList.replace('flex', 'hidden'), 300);
        }

        window.addEventListener('DOMContentLoaded', () => {

            showDashboardView();
            
            DOM.dashboardView.addEventListener('click', (e) => {
                const card = e.target.closest('a[data-app]');
                if (card && !card.classList.contains('cursor-not-allowed')) {
                    e.preventDefault();
                    const appName = card.dataset.app;
                    if (appName === 'future') {
                        showNotification('This app is coming soon!', 'info');
                        return;
                    }
                    switchApp(appName);
                }
            });

            document.querySelectorAll('.back-to-dashboard-btn').forEach(btn => {
                btn.addEventListener('click', showDashboardView);
            });

            DOM.analyzer.menuOpenBtn.addEventListener('click', showAppSwitcher);
            DOM.appSwitcher.closeBtn.addEventListener('click', hideAppSwitcher);
            DOM.appSwitcher.backdrop.addEventListener('click', hideAppSwitcher);
            DOM.appSwitcher.nav.addEventListener('click', e => {
                const link = e.target.closest('a');
                if (link && link.dataset.app) {
                    switchApp(link.dataset.app);
                }
            });

            DOM.analyzer.dropZone.addEventListener('click', () => DOM.analyzer.fileInput.click());
            DOM.analyzer.fileInput.addEventListener('change', (e) => {
                handleFile(e.target.files[0]);
                e.target.value = '';
            });
            DOM.analyzer.dropZone.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); DOM.analyzer.dropZone.classList.add('dragover'); });
            DOM.analyzer.dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); e.stopPropagation(); DOM.analyzer.dropZone.classList.remove('dragover'); });
            DOM.analyzer.dropZone.addEventListener('drop', handleFileDrop);

            // Backend Correlations File Handling
            const handleCorrelationFile = (file, type) => {
                if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const csvText = e.target.result;
                        let data;
                        let statusEl;
                        let dropZoneEl;

                        try {
                            if (typeof addToFileLibrary === 'function') {
                                addToFileLibrary({ name: file.name, content: csvText, context: `Backend Correlations (${type})` });
                            }

                            if (type === 'shopify') {
                                shopifyData = parseShopifyCsv(csvText);
                                data = shopifyData;
                                statusEl = DOM.backendCorrelations.shopifyFileStatus;
                                dropZoneEl = DOM.backendCorrelations.shopifyDropZone;
                            } else if (type === 'meta') {
                                metaCorrelationsData = parseAdPlatformCsv(csvText);
                                data = metaCorrelationsData;
                                statusEl = DOM.backendCorrelations.metaFileStatus;
                                dropZoneEl = DOM.backendCorrelations.metaDropZone;
                            } else if (type === 'google') {
                                googleCorrelationsData = parseAdPlatformCsv(csvText);
                                data = googleCorrelationsData;
                                statusEl = DOM.backendCorrelations.googleFileStatus;
                                dropZoneEl = DOM.backendCorrelations.googleDropZone;
                            }

                            if (data && data.length > 0) {
    statusEl.textContent = `${file.name} (${data.length} rows)`;
    statusEl.classList.remove('text-gray-500', 'text-red-500');
    statusEl.classList.add('text-green-600', 'font-semibold');

    dropZoneEl.innerHTML = `
        <div class="success-animation-container">
            <svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="success-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="success-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p class="text-lg font-semibold text-gray-800 mt-2">Success</p>
            <p class="text-sm text-green-600">${data.length} rows processed.</p>
        </div>
    `;
    dropZoneEl.classList.add('upload-success');

    showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} data uploaded successfully.`, 'success');
    tryRenderBackendCorrelations();
                            } else {
                                throw new Error("No data found in file.");
                            }
                        } catch (error) {
                            showNotification(`Error parsing ${type} file: ${error.message}`, 'error');
                            if (statusEl) {
                                statusEl.textContent = 'Upload failed.';
                                statusEl.classList.remove('text-green-600');
                                statusEl.classList.add('text-red-500');
                            }
                             if (dropZoneEl) {
                                dropZoneEl.classList.remove('upload-success');
                            }
                        }
                    };
                    reader.readAsText(file);
                } else {
                    showNotification('Please upload a valid .csv file.', 'error');
                }
            };

            const setupDropZone = (dropZoneEl, inputEl, type) => {
                dropZoneEl.addEventListener('click', () => inputEl.click());
                inputEl.addEventListener('change', (e) => {
                    if (e.target.files.length > 0) handleCorrelationFile(e.target.files[0], type);
                    e.target.value = '';
                });
                dropZoneEl.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); dropZoneEl.classList.add('dragover'); });
                dropZoneEl.addEventListener('dragleave', (e) => { e.preventDefault(); e.stopPropagation(); dropZoneEl.classList.remove('dragover'); });
                dropZoneEl.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZoneEl.classList.remove('dragover');
                    if (e.dataTransfer.files.length > 0) handleCorrelationFile(e.dataTransfer.files[0], type);
                });
            };

            setupDropZone(DOM.backendCorrelations.shopifyDropZone, DOM.backendCorrelations.shopifyFileInput, 'shopify');
            setupDropZone(DOM.backendCorrelations.metaDropZone, DOM.backendCorrelations.metaFileInput, 'meta');
            setupDropZone(DOM.backendCorrelations.googleDropZone, DOM.backendCorrelations.googleFileInput, 'google');

            DOM.backendCorrelations.periodTypeControls.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.backendCorrelations.periodTypeControls.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    backendCorrelationPeriodType = button.dataset.periodType;
                    processAndRenderBackendCorrelations();
                }
            });

            DOM.backendCorrelations.metricSelect.addEventListener('change', renderBackendCorrelationCharts);

            // Analyzer sidebar button listeners
            DOM.analyzer.correlationsBtn.addEventListener('click', showCorrelationsModal);
            DOM.analyzer.simulationBtn.addEventListener('click', showSimulationModal);
            DOM.analyzer.bestWorstBtn.addEventListener('click', showBestWorstModal);
            DOM.analyzer.graphAnalysisBtn.addEventListener('click', showGraphAnalysisModal);
            DOM.analyzer.granulateBtn.addEventListener('click', showGranulateModal);

            // Analyzer Dashboard Listeners
            DOM.analyzerDashboard.timeAggControls.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.analyzerDashboard.timeAggControls.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    analyzerDashboardTimeAggregation = button.dataset.period;
                    renderAnalyzerDashboard();
                }
            });

            DOM.analyzerDashboard.top5MetricSelect.addEventListener('change', renderAnalyzerTop5Table);

            // Correlations Modal Listeners
            DOM.correlationsModal.metric1Select.addEventListener('change', calculateAndRenderCorrelation);
            DOM.correlationsModal.metric2Select.addEventListener('change', calculateAndRenderCorrelation);
            DOM.correlationsModal.timeAggControls.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.correlationsModal.timeAggControls.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    correlationTimeAggregation = button.dataset.period;
                    calculateAndRenderCorrelation();
                }
            });

            // Simulation Modal Listeners
            DOM.simulationModal.spendSlider.addEventListener('input', throttle(runSimulation, 150));
            DOM.simulationModal.timeAggControls.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.simulationModal.timeAggControls.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    simulationTimeAggregation = button.dataset.period;
                    runSimulation();
                }
            });

            // Best/Worst Modal Listeners
            DOM.bestWorstModal.metricSelect.addEventListener('change', runAndRenderBestWorstAnalysis);
            DOM.bestWorstModal.timeAggControls.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.bestWorstModal.timeAggControls.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    bestWorstTimeAggregation = button.dataset.period;
                    runAndRenderBestWorstAnalysis();
                }
            });

            // Granulation Modal Listeners
            DOM.granulateModal.modeToggle.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.granulateModal.modeToggle.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    granulationMode = button.dataset.mode;
                    renderGranulateSelectors();
                    renderGranulationTable();
                }
            });

            DOM.granulateModal.resultsContainer.addEventListener('click', e => {
                const magnifyIcon = e.target.closest('.magnify-icon');
                if(magnifyIcon) {
                    showMetricChartModal(magnifyIcon.dataset.metric);
                }
            });

             // Metric Chart Modal Listeners
            DOM.metricChartModal.closeBtn.addEventListener('click', hideMetricChartModal);
            DOM.metricChartModal.backdrop.addEventListener('click', hideMetricChartModal);


            // Graph Analysis Modal Listeners
            DOM.graphAnalysisModal.timeAggControls.addEventListener('click', (e) => {
                const button = e.target.closest('button');
                if (button && !button.classList.contains('active')) {
                    DOM.graphAnalysisModal.timeAggControls.querySelector('.active').classList.remove('active');
                    button.classList.add('active');
                    graphAnalysisTimeAggregation = button.dataset.period;
                    renderAllAnalysisGraphs();
                }
            });
            DOM.graphAnalysisModal.grid.addEventListener('click', e => {
                 const chartTypeBtn = e.target.closest('.chart-type-toggle button');
                 if (chartTypeBtn && !chartTypeBtn.classList.contains('active')) {
                    const chartId = chartTypeBtn.dataset.chartId;
                    const chartType = chartTypeBtn.dataset.chartType;
                    const toggle = chartTypeBtn.closest('.chart-type-toggle');
                    toggle.querySelector('.active').classList.remove('active');
                    chartTypeBtn.classList.add('active');
                    graphAnalysisChartTypes[chartId] = chartType;
                    rerenderSingleAnalysisGraph(chartId); // Rerender with new type
                 }
                const enlargeBtn = e.target.closest('.enlarge-chart-btn');
                if(enlargeBtn) {
                    showEnlargedChart(enlargeBtn.dataset.chartId);
                }
            });

            // Enlarged Chart Modal Listeners
            DOM.enlargeChartModal.closeBtn.addEventListener('click', hideEnlargedChart);
            DOM.enlargeChartModal.backdrop.addEventListener('click', hideEnlargedChart);


            // Tools App Listeners
            DOM.tools.timeDayConverterBtn.addEventListener('click', showTimeDayConverterModal);
            DOM.timeDayConverterModal.closeBtn.addEventListener('click', hideTimeDayConverterModal);
            DOM.timeDayConverterModal.backdrop.addEventListener('click', hideTimeDayConverterModal);

            DOM.tools.percentageCalculatorBtn.addEventListener('click', showPercentageCalculatorModal);
            DOM.percentageCalculatorModal.closeBtn.addEventListener('click', hidePercentageCalculatorModal);
            DOM.percentageCalculatorModal.backdrop.addEventListener('click', hidePercentageCalculatorModal);

            DOM.tools.schreiberToolBtn.addEventListener('click', showSchreiberModal);
            DOM.schreiberToolModal.closeBtn.addEventListener('click', hideSchreiberModal);
            DOM.schreiberToolModal.backdrop.addEventListener('click', hideSchreiberModal);

            // File Library Listeners
            DOM.fileLibraryModal.btn.addEventListener('click', openFileLibraryModal);
            DOM.fileLibraryModal.closeBtn.addEventListener('click', closeFileLibraryModal);
            DOM.fileLibraryModal.backdrop.addEventListener('click', closeFileLibraryModal);
            DOM.fileLibraryModal.list.addEventListener('click', handleFileLibrarySelection);
            DOM.fileLibraryModal.useBtn.addEventListener('click', useSelectedFile);


            // --- Dark Mode & Screenshot Mode Toggles ---
            DOM.darkModeCheckbox.addEventListener('change', (e) => {
                document.documentElement.classList.toggle('dark', e.target.checked);
                localStorage.setItem('darkMode', e.target.checked);
                 rerenderAllVisibleCharts();
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                DOM.darkModeCheckbox.checked = true;
                document.documentElement.classList.add('dark');
            }

            DOM.screenshotModeCheckbox.addEventListener('change', (e) => {
                 document.body.classList.toggle('screenshot-mode', e.target.checked);
            });
            
            // --- Final Setup ---
            setupTooltips();
            runStatusChecks();
            setupVibecodedMessage();
        });