/**
 * Afri Evolution - Approach Page Scripts
 * Includes AI Readiness Assessment Modal Logic
 */

// Import main scripts
import './main.js';

// AI Readiness Assessment Modal Logic
let currentAssessmentStep = 1;

window.openAssessmentModal = function() {
    document.getElementById('assessment-modal').classList.remove('hidden');
    showAssessmentStep(1);
};

window.closeAssessmentModal = function() {
    document.getElementById('assessment-modal').classList.add('hidden');
    document.getElementById('biz-size').value = '';
    document.getElementById('industry').value = '';
    document.getElementById('pain-point').value = '';
    document.getElementById('ai-familiarity').value = '';
    showAssessmentStep(1);
    document.getElementById('assessment-result').classList.add('hidden');
};

function showAssessmentStep(stepNumber) {
    document.querySelectorAll('.assessment-step').forEach(step => {
        step.classList.add('hidden');
    });
    document.getElementById(`assessment-step-${stepNumber}`).classList.remove('hidden');
    currentAssessmentStep = stepNumber;

    const title = document.getElementById('assessment-title');
    if (stepNumber === 1) {
        title.textContent = 'Assess Your AI Readiness (Step 1/2)';
    } else if (stepNumber === 2) {
        title.textContent = 'Assess Your AI Readiness (Step 2/2)';
    }
}

window.nextAssessmentStep = function() {
    if (currentAssessmentStep === 1) {
        const bizSize = document.getElementById('biz-size').value;
        const industry = document.getElementById('industry').value;
        if (!bizSize || !industry) {
            alert('Please fill in all fields to proceed.');
            return;
        }
        showAssessmentStep(2);
    }
};

window.prevAssessmentStep = function() {
    if (currentAssessmentStep === 2) {
        showAssessmentStep(1);
    }
};

window.submitAssessment = function() {
    const painPoint = document.getElementById('pain-point').value;
    const aiFamiliarity = document.getElementById('ai-familiarity').value;

    if (!painPoint || !aiFamiliarity) {
        alert('Please fill in all fields to submit.');
        return;
    }

    let resultMessage = "Based on your responses, we recommend a tailored strategy to leverage AI and automation for your business growth.";

    if (aiFamiliarity === 'none' || aiFamiliarity === 'some') {
        resultMessage = "Your business has significant potential for digital transformation. We recommend starting with our **Digital Foundation** and exploring **Automation Essentials** to address core challenges and build efficiency.";
    } else if (aiFamiliarity === 'moderate') {
        resultMessage = "You're on the right track! We suggest focusing on advanced **Automation Essentials** and exploring specific **AI Advantage (AIaaS)** solutions that directly address your operational bottlenecks and strategic goals.";
    } else if (aiFamiliarity === 'expert') {
        resultMessage = "Excellent! You're already well into your AI journey. Let's discuss how our specialized **AI Advantage (AIaaS)** and strategic partnerships can further amplify your competitive edge and optimize existing implementations.";
    }

    document.getElementById('assessment-step-2').classList.add('hidden');
    document.getElementById('assessment-title').textContent = 'Your AI Readiness Results';
    document.getElementById('result-text').textContent = resultMessage;
    document.getElementById('assessment-result').classList.remove('hidden');
};

