document.addEventListener('DOMContentLoaded', () => {
    // DOM elements for the Tools app
    const DOM = {
        view: document.getElementById('tools-view'),
        sidebar: document.getElementById('tools-sidebar'),
        mainContent: document.getElementById('tools-main-content'),
        startDateInput: document.getElementById('tools-start-date'),
        endDateInput: document.getElementById('tools-end-date'),
        includeEndDateCheckbox: document.getElementById('tools-include-end-date'),
        resultContainer: document.getElementById('tools-result-container'),
        resultDays: document.getElementById('tools-result-days'),
        resultDetailed: document.getElementById('tools-result-detailed'),
        timeDayConverterBtn: document.getElementById('time-day-converter-btn'),
    };

    // If the view doesn't exist, do nothing.
    if (!DOM.view) {
        return;
    }

    /**
     * Calculates the duration between two dates and updates the UI.
     */
    function calculateDateDuration() {
        const startDateString = DOM.startDateInput.value;
        const endDateString = DOM.endDateInput.value;

        if (!startDateString || !endDateString) {
            DOM.resultContainer.classList.add('hidden');
            return;
        }

        // Use 'T00:00:00' to avoid timezone issues and treat dates as local at midnight.
        let startDate = new Date(startDateString + 'T00:00:00');
        let endDate = new Date(endDateString + 'T00:00:00');
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            DOM.resultContainer.classList.add('hidden');
            return;
        }

        // Swap dates if start date is after end date
        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate];
        }

        const includeEndDate = DOM.includeEndDateCheckbox.checked;

        // Calculate the difference in milliseconds
        const timeDiff = endDate.getTime() - startDate.getTime();
        
        // Convert milliseconds to days
        let totalDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        
        if (includeEndDate) {
            totalDays += 1;
        }

        // Display results
        DOM.resultDays.textContent = totalDays.toLocaleString('en-US');

        // Detailed breakdown
        const detailedBreakdown = getDetailedDateDifference(startDate, endDate, includeEndDate);
        DOM.resultDetailed.textContent = detailedBreakdown;
        
        DOM.resultContainer.classList.remove('hidden');
    }
    
    /**
     * Provides a detailed breakdown of the date difference in years, months, and days.
     * @param {Date} startDate The start date.
     * @param {Date} endDate The end date.
     * @param {boolean} includeEndDate Whether to include the end date in the final day count.
     * @returns {string} A formatted string of the detailed difference.
     */
    function getDetailedDateDifference(startDate, endDate, includeEndDate) {
        let years = endDate.getUTCFullYear() - startDate.getUTCFullYear();
        let months = endDate.getUTCMonth() - startDate.getUTCMonth();
        let days = endDate.getUTCDate() - startDate.getUTCDate();
        
        if (includeEndDate) {
            days += 1;
        }

        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), 0);
            days += prevMonth.getUTCDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        const parts = [];
        if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
        if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
        if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
        
        if (parts.length === 0) return '0 days';
        
        return "Or " + parts.join(', ');
    }


    /**
     * Initializes the tool by setting default dates and adding event listeners.
     */
    function initialize() {
        // Set default dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        DOM.startDateInput.value = today.toISOString().split('T')[0];
        DOM.endDateInput.value = tomorrow.toISOString().split('T')[0];
        
        // Add event listeners
        [DOM.startDateInput, DOM.endDateInput, DOM.includeEndDateCheckbox].forEach(el => {
            el.addEventListener('change', calculateDateDuration);
        });

        // Initial calculation
        calculateDateDuration();
    }

    // Run initialization
    initialize();
});