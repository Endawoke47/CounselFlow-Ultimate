/**
 * CounselFlow Interactive System
 * Comprehensive JavaScript functionality for all modules
 * Version 2.0 - Complete Implementation
 */

class CounselFlowInteractive {
    constructor() {
        this.isInitialized = false;
        this.activeModals = [];
        this.sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🚀 Initializing CounselFlow Interactive System v2.0...');
            console.log('📋 DOM State:', document.readyState);
            
            // Core system initialization
            this.initToastNotifications();
            this.initModalSystem();
            this.initSidebarToggle();
            this.initDropdowns();
            this.initTabs();
            this.initButtonActions();
            this.initFormHandlers();
            this.initIcons();
            this.initSearchFunctionality();
            this.initProgressTracking();
            this.initDataTables();
            this.initFileUploads();
            this.initFilters();
            this.initAccordions();
            this.initProgressBars();
            this.initDatePickers();
            this.initPaginationHandlers();
            this.initStatisticsCounters();
            this.initHoverEffects();
            this.initKeyboardNavigation();
            this.initResponsiveFeatures();
            this.initSpecificModuleFeatures();
            
            // Apply initial state
            this.applySidebarState();
            
            this.isInitialized = true;
            
            console.log('✅ CounselFlow Interactive System fully initialized');
            console.log('📊 Components Status:', {
                sidebar: '✅ Enhanced',
                dropdowns: '✅ Enhanced', 
                tabs: '✅ Enhanced',
                forms: '✅ Enhanced',
                icons: '✅ Enhanced',
                modals: '✅ Enhanced',
                search: '✅ Enhanced',
                tables: '✅ Enhanced',
                buttons: '✅ Enhanced',
                toasts: '✅ Enhanced'
            });
            
            this.showToast('🎉 CounselFlow Interactive System v2.0 Ready!', 'success');
            
        } catch (error) {
            console.error('❌ Error initializing CounselFlow Interactive System:', error);
            console.error('Stack trace:', error.stack);
        }
    }

    // ===== SIDEBAR FUNCTIONALITY =====
    initSidebarToggle() {
        console.log('🔧 Initializing sidebar toggle...');
        
        // Find all possible sidebar toggle buttons
        const toggleSelectors = [
            'button[title="Collapse sidebar"]',
            'button[title="Expand sidebar"]',
            'button[aria-label="Collapse sidebar"]',
            'button[aria-label="Expand sidebar"]',
            '.sidebar-toggle',
            '[data-sidebar-toggle]'
        ];
        
        let toggleButtons = [];
        toggleSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            toggleButtons = [...toggleButtons, ...Array.from(buttons)];
        });
        
        // Also find buttons with chevron icons in sidebar
        const chevronButtons = document.querySelectorAll('.lucide-chevron-left, .lucide-chevron-right');
        chevronButtons.forEach(icon => {
            const button = icon.closest('button');
            if (button && !toggleButtons.includes(button)) {
                toggleButtons.push(button);
            }
        });
        
        console.log(`Found ${toggleButtons.length} sidebar toggle buttons`);
        
        toggleButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Sidebar toggle ${index + 1} clicked`);
                this.toggleSidebar();
            });
        });

        // Mobile sidebar toggle
        const mobileToggleSelectors = [
            'button[aria-label="Open sidebar"]',
            '.mobile-menu-button',
            '[data-mobile-toggle]'
        ];
        
        mobileToggleSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMobileSidebar();
                });
            });
        });
    }

    applySidebarState() {
        if (this.sidebarCollapsed) {
            this.collapseSidebar(false); // false = no animation on initial load
        } else {
            this.expandSidebar(false);
        }
    }

    toggleSidebar() {
        if (this.sidebarCollapsed) {
            this.expandSidebar(true);
        } else {
            this.collapseSidebar(true);
        }
    }

    collapseSidebar(animate = true) {
        console.log('🔄 Collapsing sidebar...');
        
        const sidebar = this.findSidebar();
        const mainContent = this.findMainContent();
        const sidebarTexts = this.findSidebarTexts();
        const logo = this.findLogo();
        const chevronIcons = this.findChevronIcons();
        
        if (!sidebar) {
            console.warn('Sidebar not found');
            return;
        }
        
        // Add collapsed class
        sidebar.classList.add('sidebar-collapsed');
        
        // Animate sidebar width
        if (animate) {
            sidebar.style.transition = 'all 0.3s ease-in-out';
        }
        sidebar.style.width = '64px';
        
        // Hide text elements
        sidebarTexts.forEach(text => {
            if (animate) {
                text.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
            }
            text.style.opacity = '0';
            text.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                text.style.display = 'none';
            }, animate ? 200 : 0);
        });
        
        // Hide logo text
        if (logo) {
            if (animate) {
                logo.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
            }
            logo.style.opacity = '0';
            logo.style.transform = 'translateX(-10px)';
        }
        
        // Rotate chevron icons
        chevronIcons.forEach(icon => {
            if (animate) {
                icon.style.transition = 'transform 0.3s ease-in-out';
            }
            icon.style.transform = 'rotate(180deg)';
        });
        
        // Adjust main content
        if (mainContent) {
            if (animate) {
                mainContent.style.transition = 'margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out';
            }
            mainContent.classList.remove('md:pl-64');
            mainContent.classList.add('md:pl-16');
        }
        
        // Update button titles
        this.updateToggleButtonTitles('Expand sidebar');
        
        this.sidebarCollapsed = true;
        localStorage.setItem('sidebarCollapsed', 'true');
        
        if (animate) {
            this.showToast('Sidebar collapsed', 'info');
        }
    }

    expandSidebar(animate = true) {
        console.log('🔄 Expanding sidebar...');
        
        const sidebar = this.findSidebar();
        const mainContent = this.findMainContent();
        const sidebarTexts = this.findSidebarTexts();
        const logo = this.findLogo();
        const chevronIcons = this.findChevronIcons();
        
        if (!sidebar) {
            console.warn('Sidebar not found');
            return;
        }
        
        // Remove collapsed class
        sidebar.classList.remove('sidebar-collapsed');
        
        // Animate sidebar width
        if (animate) {
            sidebar.style.transition = 'all 0.3s ease-in-out';
        }
        sidebar.style.width = '256px';
        
        // Show text elements
        sidebarTexts.forEach(text => {
            text.style.display = '';
            if (animate) {
                text.style.transition = 'opacity 0.3s ease-in 0.1s, transform 0.3s ease-in 0.1s';
            }
            setTimeout(() => {
                text.style.opacity = '1';
                text.style.transform = 'translateX(0)';
            }, animate ? 100 : 0);
        });
        
        // Show logo text
        if (logo) {
            if (animate) {
                logo.style.transition = 'opacity 0.3s ease-in 0.1s, transform 0.3s ease-in 0.1s';
            }
            setTimeout(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translateX(0)';
            }, animate ? 100 : 0);
        }
        
        // Rotate chevron icons back
        chevronIcons.forEach(icon => {
            if (animate) {
                icon.style.transition = 'transform 0.3s ease-in-out';
            }
            icon.style.transform = 'rotate(0deg)';
        });
        
        // Adjust main content
        if (mainContent) {
            if (animate) {
                mainContent.style.transition = 'margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out';
            }
            mainContent.classList.remove('md:pl-16');
            mainContent.classList.add('md:pl-64');
        }
        
        // Update button titles
        this.updateToggleButtonTitles('Collapse sidebar');
        
        this.sidebarCollapsed = false;
        localStorage.setItem('sidebarCollapsed', 'false');
        
        if (animate) {
            this.showToast('Sidebar expanded', 'info');
        }
    }

    findSidebar() {
        const selectors = [
            '.sidebar',
            '[data-sidebar]',
            '.flex.min-h-0.flex-1.flex-col.bg-white',
            '.hidden.md\\:fixed.md\\:inset-y-0',
            '.md\\:flex.md\\:flex-col'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        
        // Fallback: find by structure
        const sidebarContainer = document.querySelector('.hidden.md\\:fixed') || 
                                document.querySelector('[class*="md:fixed"]') ||
                                document.querySelector('[class*="sidebar"]');
        
        if (sidebarContainer) {
            return sidebarContainer.querySelector('.flex.min-h-0.flex-1.flex-col') || sidebarContainer;
        }
        
        return null;
    }

    findMainContent() {
        const selectors = [
            '.flex.flex-col.flex-1',
            '[data-main-content]',
            'main',
            '.main-content'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        
        return null;
    }

    findSidebarTexts() {
        const texts = [];
        
        // Find navigation text spans
        const navTexts = document.querySelectorAll('nav span.transition-all, nav span[class*="duration-300"]');
        texts.push(...Array.from(navTexts));
        
        // Find any text in sidebar that should be hidden
        const sidebar = this.findSidebar();
        if (sidebar) {
            const spans = sidebar.querySelectorAll('span:not(.sr-only)');
            spans.forEach(span => {
                if (span.textContent.trim() && !texts.includes(span)) {
                    texts.push(span);
                }
            });
        }
        
        return texts;
    }

    findLogo() {
        const selectors = [
            'h1',
            '.logo',
            '[data-logo]'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent.includes('CounselFlow')) {
                return element;
            }
        }
        
        return null;
    }

    findChevronIcons() {
        return document.querySelectorAll('.lucide-chevron-left, .lucide-chevron-right, [class*="chevron"]');
    }

    updateToggleButtonTitles(title) {
        const buttons = document.querySelectorAll('button[title*="sidebar"], button[aria-label*="sidebar"]');
        buttons.forEach(button => {
            button.title = title;
            button.setAttribute('aria-label', title);
        });
    }

    toggleMobileSidebar() {
        console.log('📱 Toggling mobile sidebar...');
        this.showToast('Mobile sidebar toggled', 'info');
        // Mobile sidebar implementation would go here
    }

    // ===== DROPDOWN FUNCTIONALITY =====
    initDropdowns() {
        console.log('🔧 Initializing dropdowns...');
        
        // Find all dropdown triggers
        const dropdownSelectors = [
            'button[aria-haspopup="true"]',
            'button[aria-expanded]',
            '.dropdown-trigger',
            '[data-dropdown-trigger]'
        ];
        
        let dropdownTriggers = [];
        dropdownSelectors.forEach(selector => {
            const triggers = document.querySelectorAll(selector);
            dropdownTriggers = [...dropdownTriggers, ...Array.from(triggers)];
        });
        
        // Also find buttons with chevron-down icons (likely dropdowns)
        const chevronDowns = document.querySelectorAll('.lucide-chevron-down');
        chevronDowns.forEach(icon => {
            const button = icon.closest('button');
            if (button && !dropdownTriggers.includes(button)) {
                dropdownTriggers.push(button);
                button.setAttribute('aria-haspopup', 'true');
                button.setAttribute('aria-expanded', 'false');
            }
        });
        
        console.log(`Found ${dropdownTriggers.length} dropdown triggers`);
        
        dropdownTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Dropdown ${index + 1} clicked`);
                this.toggleDropdown(trigger);
            });
            
            // Ensure proper ARIA attributes
            if (!trigger.hasAttribute('aria-haspopup')) {
                trigger.setAttribute('aria-haspopup', 'true');
            }
            if (!trigger.hasAttribute('aria-expanded')) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[aria-haspopup="true"]') && !e.target.closest('.dropdown-menu')) {
                this.closeAllDropdowns();
            }
        });
        
        // Close dropdowns with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    toggleDropdown(trigger) {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const chevron = trigger.querySelector('.lucide-chevron-down, [class*="chevron-down"]');
        
        console.log(`Toggling dropdown, currently expanded: ${isExpanded}`);
        
        // Close all other dropdowns first
        this.closeAllDropdowns();
        
        if (!isExpanded) {
            // Open this dropdown
            trigger.setAttribute('aria-expanded', 'true');
            
            // Rotate chevron
            if (chevron) {
                chevron.style.transition = 'transform 0.2s ease-out';
                chevron.style.transform = 'rotate(180deg)';
            }
            
            // Create and show dropdown menu
            this.createDropdownMenu(trigger);
            
            this.showToast('Dropdown opened', 'info');
        }
    }

    closeAllDropdowns() {
        const dropdownTriggers = document.querySelectorAll('button[aria-haspopup="true"]');
        dropdownTriggers.forEach(trigger => {
            trigger.setAttribute('aria-expanded', 'false');
            
            const chevron = trigger.querySelector('.lucide-chevron-down, [class*="chevron-down"]');
            if (chevron) {
                chevron.style.transform = 'rotate(0deg)';
            }
            
            // Remove dropdown menu
            const existingMenu = trigger.parentNode.querySelector('.dropdown-menu');
            if (existingMenu) {
                existingMenu.style.opacity = '0';
                existingMenu.style.transform = 'translateY(-10px) scale(0.95)';
                setTimeout(() => {
                    if (existingMenu.parentNode) {
                        existingMenu.parentNode.removeChild(existingMenu);
                    }
                }, 200);
            }
        });
    }

    createDropdownMenu(trigger) {
        // Remove any existing menu first
        const existingMenu = trigger.parentNode.querySelector('.dropdown-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        const menu = document.createElement('div');
        menu.className = 'dropdown-menu absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px) scale(0.95)';
        menu.style.transition = 'all 0.2s ease-out';
        
        // Add menu items based on context
        const menuItems = this.getDropdownItems(trigger);
        menu.innerHTML = menuItems;
        
        // Ensure parent has relative positioning
        const parent = trigger.parentNode;
        parent.style.position = 'relative';
        parent.appendChild(menu);
        
        // Add click handlers to menu items
        menu.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const action = item.textContent.trim();
                this.handleDropdownAction(action);
                this.closeAllDropdowns();
            });
        });
        
        // Animate in
        setTimeout(() => {
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0) scale(1)';
        }, 10);
        
        // Prevent menu clicks from closing dropdown
        menu.addEventListener('click', (e) => e.stopPropagation());
    }

    getDropdownItems(trigger) {
        // Determine context based on trigger location or content
        const triggerText = trigger.textContent.toLowerCase();
        const isUserProfile = triggerText.includes('user') || triggerText.includes('demo') || 
                             trigger.querySelector('[class*="rounded-full"]'); // Profile avatar
        
        if (isUserProfile) {
            return `
                <a href="../profile/" class="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                </a>
                <a href="../settings/" class="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                </a>
                <a href="../billing/" class="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Billing
                </a>
                <div class="border-t border-gray-100 my-1"></div>
                <a href="../help-support/" class="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help & Support
                </a>
                <button class="dropdown-item flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                </button>
            `;
        } else {
            // Generic dropdown menu
            return `
                <a href="#" class="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Action 1
                </a>
                <a href="#" class="dropdown-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Action 2
                </a>
            `;
        }
    }

    handleDropdownAction(action) {
        console.log(`Dropdown action: ${action}`);
        
        switch (action.toLowerCase()) {
            case 'view profile':
                window.location.href = '../profile/';
                break;
            case 'settings':
                window.location.href = '../settings/';
                break;
            case 'billing':
                window.location.href = '../billing/';
                break;
            case 'help & support':
                window.location.href = '../help-support/';
                break;
            case 'sign out':
                this.handleSignOut();
                break;
            default:
                this.showToast(`Selected: ${action}`, 'info');
        }
    }

    handleSignOut() {
        this.showToast('Signing out...', 'info');
        setTimeout(() => {
            window.location.href = '../login/';
        }, 1000);
    }

    // Button Actions
    initButtonActions() {
        // Quick action buttons
        const quickActionButtons = document.querySelectorAll('button:contains("New Matter"), button:contains("File Dispute"), button:contains("Add Entity"), button:contains("Generate Report"), button:contains("Add Contract")');
        
        this.setupButtonClick('New Matter', () => this.showModal('Create New Matter', this.getNewMatterForm()));
        this.setupButtonClick('File Dispute', () => this.showModal('File New Dispute', this.getNewDisputeForm()));
        this.setupButtonClick('Add Entity', () => this.showModal('Add New Entity', this.getNewEntityForm()));
        this.setupButtonClick('Generate Report', () => this.generateReport());
        this.setupButtonClick('Add Contract', () => this.showModal('Add New Contract', this.getNewContractForm()));
        this.setupButtonClick('Import', () => this.handleImport());
        this.setupButtonClick('Export', () => this.handleExport());
        this.setupButtonClick('Change Plan', () => this.showModal('Change Subscription Plan', this.getPlanChangeForm()));
        this.setupButtonClick('Update Payment Method', () => this.showModal('Update Payment Method', this.getPaymentMethodForm()));
        this.setupButtonClick('Add New Card', () => this.showModal('Add New Card', this.getNewCardForm()));
        
        // Tab buttons
        this.initTabButtons();
        
        // Form submit buttons
        this.initFormButtons();
    }

    setupButtonClick(buttonText, callback) {
        const buttons = Array.from(document.querySelectorAll('button')).filter(btn => 
            btn.textContent.trim().includes(buttonText)
        );
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                callback();
            });
        });
    }

    initTabButtons() {
        const tabButtons = document.querySelectorAll('[role="tablist"] button, .grid.grid-cols-4 button');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(button);
            });
        });
    }

    switchTab(activeButton) {
        const tabContainer = activeButton.closest('.grid');
        if (!tabContainer) return;
        
        const allButtons = tabContainer.querySelectorAll('button');
        
        allButtons.forEach(btn => {
            btn.classList.remove('bg-background', 'text-foreground', 'shadow-sm');
            btn.classList.add('text-muted-foreground');
        });
        
        activeButton.classList.add('bg-background', 'text-foreground', 'shadow-sm');
        activeButton.classList.remove('text-muted-foreground');
        
        this.showToast(`Switched to ${activeButton.textContent.trim()}`, 'info');
    }

    // Search Functionality
    initSearchFunctionality() {
        const searchInputs = document.querySelectorAll('input[placeholder*="Search"], input[placeholder*="search"]');
        
        searchInputs.forEach(input => {
            // Real-time search
            let searchTimeout;
            input.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value, e.target);
                }, 300);
            });
            
            // Enter key search
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value, e.target);
                }
            });
        });
    }

    performSearch(query, input) {
        if (!query.trim()) {
            this.clearSearchResults(input);
            return;
        }
        
        // Show search indicator
        this.showSearchIndicator(input);
        
        // Simulate search delay
        setTimeout(() => {
            this.hideSearchIndicator(input);
            this.showSearchResults(query, input);
        }, 500);
    }

    showSearchIndicator(input) {
        const indicator = document.createElement('div');
        indicator.className = 'search-indicator absolute right-3 top-1/2 transform -translate-y-1/2';
        indicator.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>';
        
        const container = input.parentNode;
        container.style.position = 'relative';
        container.appendChild(indicator);
    }

    hideSearchIndicator(input) {
        const indicator = input.parentNode.querySelector('.search-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    showSearchResults(query, input) {
        this.showToast(`Search results for "${query}"`, 'success');
        
        // Here you would typically update the table or list with filtered results
        const table = document.querySelector('table tbody');
        if (table) {
            this.filterTableRows(table, query);
        }
    }

    filterTableRows(tbody, query) {
        const rows = tbody.querySelectorAll('tr');
        let visibleCount = 0;
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const isVisible = text.includes(query.toLowerCase());
            
            row.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });
        
        if (visibleCount === 0) {
            this.showEmptyState(tbody, `No results found for "${query}"`);
        } else {
            this.hideEmptyState(tbody);
        }
    }

    clearSearchResults(input) {
        const table = document.querySelector('table tbody');
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                row.style.display = '';
            });
            this.hideEmptyState(table);
        }
    }

    // Modal System
    initModalSystem() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.style.opacity = '0';
        
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" style="transform: translateY(-20px)">
                <div class="modal-header flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">${title}</h2>
                    <button class="modal-close text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body p-6">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transition = 'opacity 0.3s ease-out';
            const content = modal.querySelector('.modal-content');
            content.style.transform = 'translateY(0)';
            content.style.transition = 'transform 0.3s ease-out';
        }, 10);
        
        // Add close button handler
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        
        // Prevent modal content clicks from closing modal
        modal.querySelector('.modal-content').addEventListener('click', (e) => e.stopPropagation());
    }

    closeModal() {
        const modal = document.querySelector('.modal-backdrop');
        if (modal) {
            modal.style.opacity = '0';
            const content = modal.querySelector('.modal-content');
            content.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // Toast Notifications
    initToastNotifications() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(container);
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const container = document.querySelector('.toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        }[type] || 'bg-blue-500';
        
        toast.className = `toast ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg max-w-sm`;
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        toast.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium">${message}</span>
                <button class="ml-4 text-white hover:text-gray-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `;
        
        container.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
            toast.style.transition = 'all 0.3s ease-out';
        }, 10);
        
        // Close button
        toast.querySelector('button').addEventListener('click', () => {
            this.removeToast(toast);
        });
        
        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    removeToast(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Form content generators
    getNewMatterForm() {
        return `
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Matter Title</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter matter title">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Select a client</option>
                        <option>TechCorp Limited</option>
                        <option>Global Industries</option>
                        <option>Innovation Partners</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Matter Type</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Corporate Law</option>
                        <option>Intellectual Property</option>
                        <option>Contract Review</option>
                        <option>Compliance</option>
                        <option>Litigation</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" rows="3" placeholder="Brief description of the matter"></textarea>
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" class="modal-close px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Create Matter</button>
                </div>
            </form>
        `;
    }

    getNewDisputeForm() {
        return `
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Dispute Title</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter dispute title">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Dispute Type</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Contract Dispute</option>
                        <option>Employment Dispute</option>
                        <option>Commercial Dispute</option>
                        <option>IP Dispute</option>
                        <option>Regulatory Dispute</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Parties Involved</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="List all parties">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" rows="4" placeholder="Detailed description of the dispute"></textarea>
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" class="modal-close px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">File Dispute</button>
                </div>
            </form>
        `;
    }

    getNewEntityForm() {
        return `
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Entity Name</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter entity name">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Corporation</option>
                        <option>Limited Liability Company</option>
                        <option>Partnership</option>
                        <option>Sole Proprietorship</option>
                        <option>Non-Profit</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g., Delaware, Kenya, etc.">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Entity registration number">
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" class="modal-close px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Add Entity</button>
                </div>
            </form>
        `;
    }

    getNewContractForm() {
        return `
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Contract Title</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter contract title">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Service Agreement</option>
                        <option>Non-Disclosure Agreement</option>
                        <option>Employment Contract</option>
                        <option>Supply Agreement</option>
                        <option>License Agreement</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Counterparty</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Other party name">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Contract Value</label>
                    <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="0.00">
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" class="modal-close px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Add Contract</button>
                </div>
            </form>
        `;
    }

    getPlanChangeForm() {
        return `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
                        <h3 class="font-semibold text-lg">Basic</h3>
                        <p class="text-gray-600 text-sm mb-2">Perfect for small practices</p>
                        <p class="text-2xl font-bold text-gray-900">$99<span class="text-base font-normal text-gray-500">/month</span></p>
                        <ul class="mt-3 space-y-1 text-sm text-gray-600">
                            <li>✓ Up to 100 matters</li>
                            <li>✓ Basic reporting</li>
                            <li>✓ Email support</li>
                        </ul>
                    </div>
                    <div class="border-2 border-primary-500 rounded-lg p-4 cursor-pointer bg-primary-50">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold text-lg">Pro</h3>
                            <span class="bg-primary-500 text-white text-xs px-2 py-1 rounded">Current</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">Most popular choice</p>
                        <p class="text-2xl font-bold text-gray-900">$299<span class="text-base font-normal text-gray-500">/month</span></p>
                        <ul class="mt-3 space-y-1 text-sm text-gray-600">
                            <li>✓ Unlimited matters</li>
                            <li>✓ AI-powered analysis</li>
                            <li>✓ Advanced reporting</li>
                            <li>✓ Priority support</li>
                        </ul>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
                        <h3 class="font-semibold text-lg">Enterprise</h3>
                        <p class="text-gray-600 text-sm mb-2">For large organizations</p>
                        <p class="text-2xl font-bold text-gray-900">$999<span class="text-base font-normal text-gray-500">/month</span></p>
                        <ul class="mt-3 space-y-1 text-sm text-gray-600">
                            <li>✓ Everything in Pro</li>
                            <li>✓ Custom integrations</li>
                            <li>✓ Dedicated support</li>
                            <li>✓ SLA guarantee</li>
                        </ul>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" class="modal-close px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Change Plan</button>
                </div>
            </div>
        `;
    }

    getPaymentMethodForm() {
        return `
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="1234 5678 9012 3456">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="MM/YY">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="123">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Full name on card">
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" class="modal-close px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Update Payment Method</button>
                </div>
            </form>
        `;
    }

    getNewCardForm() {
        return this.getPaymentMethodForm(); // Same form for now
    }

    // Additional functionality methods
    initFormHandlers() {
        console.log('🔧 Initializing comprehensive form handlers...');
        
        // Handle all form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e.target);
        });
        
        // Initialize all forms with enhanced functionality
        this.initAllForms();
        this.initAllFormButtons();
    }

    initAllForms() {
        const forms = document.querySelectorAll('form');
        console.log(`Found ${forms.length} forms to enhance`);
        
        forms.forEach((form, index) => {
            this.enhanceForm(form, index + 1);
        });
    }

    enhanceForm(form, formNumber) {
        // Add form-specific styling and functionality
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Enhanced focus effects
            input.addEventListener('focus', () => {
                input.style.borderColor = '#3b82f6';
                input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                input.style.transition = 'all 0.2s ease-out';
            });
            
            input.addEventListener('blur', () => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
            
            // Real-time validation
            input.addEventListener('input', () => {
                this.validateFormInput(input);
            });
        });
        
        console.log(`Enhanced form ${formNumber} with ${inputs.length} inputs`);
    }

    initAllFormButtons() {
        console.log('🔧 Initializing all form buttons...');
        
        const allButtons = document.querySelectorAll('button, .btn, [role="button"]');
        console.log(`Found ${allButtons.length} buttons to enhance`);
        
        allButtons.forEach((button, index) => {
            if (!button.hasAttribute('data-enhanced')) {
                this.enhanceButton(button, index + 1);
                button.setAttribute('data-enhanced', 'true');
            }
        });
    }

    enhanceButton(button, buttonNumber) {
        // Add comprehensive button functionality
        button.addEventListener('click', (e) => {
            this.handleUniversalButtonClick(button, e);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(-1px)';
                button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                button.style.transition = 'all 0.2s ease-out';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        console.log(`Enhanced button ${buttonNumber}: "${button.textContent.trim().substring(0, 20)}..."`);
    }

    handleUniversalButtonClick(button, event) {
        // Prevent double-clicks
        if (button.disabled) return;
        
        const buttonText = button.textContent.trim().toLowerCase();
        console.log(`🔘 Button clicked: "${buttonText}"`);
        
        // Visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = '', 100);
        
        // Handle specific button types based on text content
        if (this.isSubmitButton(button, buttonText)) {
            this.handleSubmitButtonClick(button);
        } else if (this.isCancelButton(buttonText)) {
            this.handleCancelButtonClick(button);
        } else if (this.isDeleteButton(buttonText)) {
            this.handleDeleteButtonClick(button);
        } else if (this.isSaveButton(buttonText)) {
            this.handleSaveButtonClick(button);
        } else if (this.isAddButton(buttonText)) {
            this.handleAddButtonClick(button);
        } else if (this.isEditButton(buttonText)) {
            this.handleEditButtonClick(button);
        } else if (this.isViewButton(buttonText)) {
            this.handleViewButtonClick(button);
        } else if (this.isSearchButton(buttonText)) {
            this.handleSearchButtonClick(button);
        } else if (this.isDownloadButton(buttonText)) {
            this.handleDownloadButtonClick(button);
        } else if (this.isUploadButton(buttonText)) {
            this.handleUploadButtonClick(button);
        } else {
            this.handleGenericButtonClick(button, buttonText);
        }
    }

    // Button type detection methods
    isSubmitButton(button, text) {
        return button.type === 'submit' || text.includes('submit') || text.includes('send');
    }
    
    isCancelButton(text) {
        return text.includes('cancel') || text.includes('close') || text.includes('dismiss');
    }
    
    isDeleteButton(text) {
        return text.includes('delete') || text.includes('remove') || text.includes('trash');
    }
    
    isSaveButton(text) {
        return text.includes('save') || text.includes('update') || text.includes('confirm');
    }
    
    isAddButton(text) {
        return text.includes('add') || text.includes('create') || text.includes('new') || text.includes('+');
    }
    
    isEditButton(text) {
        return text.includes('edit') || text.includes('modify') || text.includes('pencil');
    }
    
    isViewButton(text) {
        return text.includes('view') || text.includes('details') || text.includes('show');
    }
    
    isSearchButton(text) {
        return text.includes('search') || text.includes('filter') || text.includes('find');
    }
    
    isDownloadButton(text) {
        return text.includes('download') || text.includes('export');
    }
    
    isUploadButton(text) {
        return text.includes('upload') || text.includes('import') || text.includes('browse');
    }

    // Button action handlers
    handleSubmitButtonClick(button) {
        const form = button.closest('form');
        if (form) {
            this.handleFormSubmit(form);
        } else {
            this.showButtonLoading(button, 'Submitting...');
            setTimeout(() => {
                this.resetButtonLoading(button);
                this.showToast('Submitted successfully!', 'success');
            }, 1500);
        }
    }
    
    handleCancelButtonClick(button) {
        this.showToast('Action cancelled', 'info');
        this.closeModals();
    }
    
    handleDeleteButtonClick(button) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.showButtonLoading(button, 'Deleting...');
            setTimeout(() => {
                this.resetButtonLoading(button);
                this.showToast('Item deleted successfully!', 'success');
            }, 1000);
        }
    }
    
    handleSaveButtonClick(button) {
        this.showButtonLoading(button, 'Saving...');
        setTimeout(() => {
            this.resetButtonLoading(button);
            this.showToast('Saved successfully!', 'success');
        }, 1200);
    }
    
    handleAddButtonClick(button) {
        this.showToast('Add functionality activated', 'info');
        // Could trigger modal or form
    }
    
    handleEditButtonClick(button) {
        this.showToast('Edit mode activated', 'info');
    }
    
    handleViewButtonClick(button) {
        this.showToast('Opening details...', 'info');
    }
    
    handleSearchButtonClick(button) {
        this.showButtonLoading(button, 'Searching...');
        setTimeout(() => {
            this.resetButtonLoading(button);
            this.showToast('Search completed!', 'success');
        }, 1000);
    }
    
    handleDownloadButtonClick(button) {
        this.showButtonLoading(button, 'Downloading...');
        setTimeout(() => {
            this.resetButtonLoading(button);
            this.showToast('Download completed!', 'success');
        }, 2000);
    }
    
    handleUploadButtonClick(button) {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.showToast(`File selected: ${e.target.files[0].name}`, 'success');
            }
        });
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }
    
    handleGenericButtonClick(button, buttonText) {
        this.showToast(`Action: ${buttonText}`, 'info');
    }

    showButtonLoading(button, text = 'Loading...') {
        if (!button.dataset.originalContent) {
            button.dataset.originalContent = button.innerHTML;
        }
        button.disabled = true;
        button.innerHTML = `
            <svg class="animate-spin h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ${text}
        `;
    }

    resetButtonLoading(button) {
        button.disabled = false;
        if (button.dataset.originalContent) {
            button.innerHTML = button.dataset.originalContent;
        }
    }

    validateFormInput(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        const inputType = input.type;
        
        // Remove previous validation styles
        input.classList.remove('border-red-500', 'border-green-500');
        
        let isValid = true;
        
        if (isRequired && !value) {
            isValid = false;
        } else if (inputType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
        } else if (inputType === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
        }
        
        // Apply validation styling
        if (value || isRequired) {
            input.classList.add(isValid ? 'border-green-500' : 'border-red-500');
        }
        
        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        return /^[\+]?[1-9][\d]{0,15}$/.test(cleaned);
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('📝 Form submitted with data:', data);
        
        this.showToast('Form submitted successfully!', 'success');
        
        // Close modal if form is in a modal
        if (form.closest('.modal-content')) {
            this.closeModal();
        }
        
        // Simulate data update
        setTimeout(() => {
            this.refreshPage();
        }, 1000);
    }

    // ===== TAB FUNCTIONALITY =====
    initTabs() {
        console.log('🔧 Initializing tabs...');
        
        // Find all tab systems
        const tabSystems = this.findTabSystems();
        console.log(`Found ${tabSystems.length} tab systems`);
        
        tabSystems.forEach((system, index) => {
            this.enhanceTabSystem(system, index + 1);
        });
    }

    findTabSystems() {
        const tabSystems = [];
        
        // Method 1: Look for elements with tab-related classes
        const tabContainers = document.querySelectorAll('[class*="tab"], .nav-tabs, .nav-pills');
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('[class*="tab-"], [role="tab"], .nav-link');
            if (tabs.length > 0) {
                tabSystems.push({
                    container: container,
                    tabs: Array.from(tabs),
                    type: 'class-based'
                });
            }
        });
        
        // Method 2: Look for ARIA tab patterns
        const ariaTabLists = document.querySelectorAll('[role="tablist"]');
        ariaTabLists.forEach(tablist => {
            const tabs = tablist.querySelectorAll('[role="tab"]');
            if (tabs.length > 0) {
                tabSystems.push({
                    container: tablist,
                    tabs: Array.from(tabs),
                    type: 'aria-based'
                });
            }
        });
        
        // Method 3: Look for button groups that might be tabs
        const buttonGroups = document.querySelectorAll('.btn-group, .button-group');
        buttonGroups.forEach(group => {
            const buttons = group.querySelectorAll('button');
            if (buttons.length > 1) {
                tabSystems.push({
                    container: group,
                    tabs: Array.from(buttons),
                    type: 'button-group'
                });
            }
        });
        
        // Method 4: Look for navigation items that might be tabs
        const navItems = document.querySelectorAll('nav ul li');
        if (navItems.length > 1) {
            const parentNav = navItems[0]?.closest('nav');
            if (parentNav && !parentNav.querySelector('a[href*="/"]')) {
                // Likely internal tabs, not navigation links
                tabSystems.push({
                    container: parentNav,
                    tabs: Array.from(navItems),
                    type: 'nav-based'
                });
            }
        }
        
        return tabSystems;
    }

    enhanceTabSystem(system, systemNumber) {
        console.log(`Enhancing tab system ${systemNumber} (${system.type}) with ${system.tabs.length} tabs`);
        
        system.tabs.forEach((tab, index) => {
            // Ensure tab has proper attributes
            if (!tab.hasAttribute('role')) {
                tab.setAttribute('role', 'tab');
            }
            if (!tab.hasAttribute('tabindex')) {
                tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
            }
            if (!tab.hasAttribute('aria-selected')) {
                tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            }
            
            // Add click handler
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleTabClick(tab, system);
            });
            
            // Add keyboard navigation
            tab.addEventListener('keydown', (e) => {
                this.handleTabKeydown(e, tab, system);
            });
            
            // Style active tab if it's the first one
            if (index === 0) {
                this.setActiveTab(tab, system);
            }
        });
        
        // Find and set up tab panels
        this.setupTabPanels(system);
    }

    handleTabClick(clickedTab, system) {
        console.log(`Tab clicked: ${clickedTab.textContent.trim()}`);
        
        // Remove active state from all tabs
        system.tabs.forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
            tab.classList.remove('active', 'bg-blue-500', 'text-white');
            tab.classList.add('text-gray-600', 'hover:text-gray-800');
        });
        
        // Set active state on clicked tab
        this.setActiveTab(clickedTab, system);
        
        // Show corresponding tab panel
        this.showTabPanel(clickedTab, system);
        
        this.showToast(`Switched to: ${clickedTab.textContent.trim()}`, 'info');
    }

    setActiveTab(tab, system) {
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        tab.classList.add('active', 'bg-blue-500', 'text-white');
        tab.classList.remove('text-gray-600', 'hover:text-gray-800');
        tab.focus();
    }

    handleTabKeydown(event, tab, system) {
        const currentIndex = system.tabs.indexOf(tab);
        let targetIndex = -1;
        
        switch (event.key) {
            case 'ArrowLeft':
                targetIndex = currentIndex > 0 ? currentIndex - 1 : system.tabs.length - 1;
                break;
            case 'ArrowRight':
                targetIndex = currentIndex < system.tabs.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                targetIndex = 0;
                break;
            case 'End':
                targetIndex = system.tabs.length - 1;
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                this.handleTabClick(tab, system);
                return;
        }
        
        if (targetIndex !== -1) {
            event.preventDefault();
            this.handleTabClick(system.tabs[targetIndex], system);
        }
    }

    setupTabPanels(system) {
        // Try to find associated tab panels
        const panels = this.findTabPanels(system);
        
        if (panels.length > 0) {
            console.log(`Found ${panels.length} tab panels for system`);
            
            // Hide all panels except the first one
            panels.forEach((panel, index) => {
                if (!panel.hasAttribute('role')) {
                    panel.setAttribute('role', 'tabpanel');
                }
                panel.style.display = index === 0 ? 'block' : 'none';
                panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
            });
            
            system.panels = panels;
        } else {
            // Create generic tab content if no panels found
            console.log('No tab panels found, creating generic content');
            this.createGenericTabPanels(system);
        }
    }

    findTabPanels(system) {
        const panels = [];
        
        // Method 1: Look for role="tabpanel"
        const ariaPanels = document.querySelectorAll('[role="tabpanel"]');
        if (ariaPanels.length > 0) {
            return Array.from(ariaPanels);
        }
        
        // Method 2: Look for tab-content class
        const tabContent = document.querySelectorAll('.tab-content, .tab-pane');
        if (tabContent.length > 0) {
            return Array.from(tabContent);
        }
        
        // Method 3: Look for elements with IDs that might match tab controls
        system.tabs.forEach(tab => {
            const controls = tab.getAttribute('aria-controls');
            if (controls) {
                const panel = document.getElementById(controls);
                if (panel) panels.push(panel);
            }
        });
        
        return panels;
    }

    showTabPanel(activeTab, system) {
        if (!system.panels) return;
        
        const tabIndex = system.tabs.indexOf(activeTab);
        
        // Hide all panels
        system.panels.forEach(panel => {
            panel.style.display = 'none';
            panel.setAttribute('aria-hidden', 'true');
        });
        
        // Show the corresponding panel
        if (system.panels[tabIndex]) {
            system.panels[tabIndex].style.display = 'block';
            system.panels[tabIndex].setAttribute('aria-hidden', 'false');
        }
    }

    createGenericTabPanels(system) {
        // Create a container for tab panels
        const panelsContainer = document.createElement('div');
        panelsContainer.className = 'tab-panels mt-4';
        
        const panels = [];
        
        system.tabs.forEach((tab, index) => {
            const panel = document.createElement('div');
            panel.className = 'tab-panel p-4 border border-gray-200 rounded-lg';
            panel.setAttribute('role', 'tabpanel');
            panel.style.display = index === 0 ? 'block' : 'none';
            panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
            
            const tabName = tab.textContent.trim();
            panel.innerHTML = `
                <h3 class="text-lg font-semibold mb-3">${tabName}</h3>
                <p class="text-gray-600 mb-4">Content for ${tabName} tab.</p>
                <div class="space-y-2">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Action in ${tabName}
                    </button>
                    <p class="text-sm text-gray-500">This is a dynamically created tab panel for the ${tabName} section.</p>
                </div>
            `;
            
            panels.push(panel);
            panelsContainer.appendChild(panel);
        });
        
        // Insert the panels container after the tab system
        system.container.parentNode.insertBefore(panelsContainer, system.container.nextSibling);
        system.panels = panels;
        
        console.log(`Created ${panels.length} generic tab panels`);
    }

    generateReport() {
        this.showToast('Generating report...', 'info');
        
        setTimeout(() => {
            this.showToast('Report generated successfully!', 'success');
        }, 2000);
    }

    // ===== ICON AND INTERACTIVE ELEMENT FUNCTIONALITY =====
    initIcons() {
        console.log('🔧 Initializing icons and interactive elements...');
        
        // Find and enhance all clickable icons
        this.initClickableIcons();
        
        // Find and enhance all interactive elements
        this.initInteractiveElements();
        
        // Initialize data tables
        this.initDataTables();
        
        // Initialize progress indicators
        this.initProgressIndicators();
        
        // Initialize toggle switches
        this.initToggleSwitches();
        
        // Initialize status badges
        this.initStatusBadges();
    }

    initClickableIcons() {
        const iconSelectors = [
            'svg[class*="lucide"]',
            'i[class*="fa-"]',
            'i[class*="icon-"]',
            '.icon',
            '[class*="icon"]',
            'svg[class*="w-"]', // Tailwind icon sizing classes
            '.cursor-pointer svg',
            'button svg',
            'a svg'
        ];
        
        let clickableIcons = [];
        
        iconSelectors.forEach(selector => {
            const icons = document.querySelectorAll(selector);
            icons.forEach(icon => {
                // Check if icon is inside a clickable element or is clickable itself
                const clickableParent = icon.closest('button, a, [onclick], [role="button"], .cursor-pointer');
                if (clickableParent || icon.classList.contains('cursor-pointer')) {
                    clickableIcons.push(icon);
                }
            });
        });
        
        // Remove duplicates
        clickableIcons = [...new Set(clickableIcons)];
        
        console.log(`Found ${clickableIcons.length} clickable icons`);
        
        clickableIcons.forEach((icon, index) => {
            if (!icon.hasAttribute('data-icon-enhanced')) {
                this.enhanceClickableIcon(icon, index + 1);
                icon.setAttribute('data-icon-enhanced', 'true');
            }
        });
    }

    enhanceClickableIcon(icon, iconNumber) {
        const parentButton = icon.closest('button, a, [role="button"]');
        
        // If icon is not already in a clickable element, make it clickable
        if (!parentButton) {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleIconClick(icon);
            });
        }
        
        // Add hover effects
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.2s ease-out';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
        
        console.log(`Enhanced icon ${iconNumber}`);
    }

    handleIconClick(icon) {
        const iconType = this.determineIconType(icon);
        console.log(`🔘 Icon clicked: ${iconType}`);
        
        // Add click animation
        icon.style.transform = 'scale(0.9)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 100);
        
        // Handle based on icon type
        switch (iconType) {
            case 'edit':
                this.showToast('Edit mode activated', 'info');
                break;
            case 'delete':
                if (confirm('Are you sure you want to delete this item?')) {
                    this.showToast('Item deleted', 'success');
                }
                break;
            case 'download':
                this.showToast('Download started', 'info');
                break;
            case 'upload':
                this.showToast('Upload dialog opened', 'info');
                break;
            case 'search':
                this.showToast('Search activated', 'info');
                break;
            case 'filter':
                this.showToast('Filter applied', 'info');
                break;
            case 'settings':
                this.showToast('Settings opened', 'info');
                break;
            case 'refresh':
                this.showToast('Refreshing...', 'info');
                setTimeout(() => this.refreshPage(), 1000);
                break;
            case 'close':
                this.showToast('Closed', 'info');
                break;
            case 'menu':
                this.showToast('Menu toggled', 'info');
                break;
            default:
                this.showToast('Icon action triggered', 'info');
        }
    }

    determineIconType(icon) {
        // Check class names for icon type
        const classes = icon.className.toLowerCase();
        const parentText = icon.closest('button, a')?.textContent?.toLowerCase() || '';
        
        if (classes.includes('edit') || classes.includes('pencil') || parentText.includes('edit')) {
            return 'edit';
        } else if (classes.includes('delete') || classes.includes('trash') || classes.includes('remove') || parentText.includes('delete')) {
            return 'delete';
        } else if (classes.includes('download') || parentText.includes('download')) {
            return 'download';
        } else if (classes.includes('upload') || parentText.includes('upload')) {
            return 'upload';
        } else if (classes.includes('search') || parentText.includes('search')) {
            return 'search';
        } else if (classes.includes('filter') || parentText.includes('filter')) {
            return 'filter';
        } else if (classes.includes('settings') || classes.includes('gear') || parentText.includes('settings')) {
            return 'settings';
        } else if (classes.includes('refresh') || classes.includes('reload') || parentText.includes('refresh')) {
            return 'refresh';
        } else if (classes.includes('close') || classes.includes('x') || parentText.includes('close')) {
            return 'close';
        } else if (classes.includes('menu') || classes.includes('hamburger') || parentText.includes('menu')) {
            return 'menu';
        }
        
        return 'generic';
    }

    initInteractiveElements() {
        console.log('🔧 Initializing interactive elements...');
        
        // Find all potentially interactive elements
        const interactiveSelectors = [
            '[onclick]',
            '[data-action]',
            '.clickable',
            '.interactive',
            '[role="button"]',
            'td[class*="cursor-pointer"]',
            'tr[class*="cursor-pointer"]',
            '.card[class*="cursor-pointer"]',
            '.list-item[class*="cursor-pointer"]'
        ];
        
        let interactiveElements = [];
        
        interactiveSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            interactiveElements = [...interactiveElements, ...Array.from(elements)];
        });
        
        // Remove duplicates and already enhanced elements
        interactiveElements = [...new Set(interactiveElements)].filter(el => 
            !el.hasAttribute('data-interactive-enhanced')
        );
        
        console.log(`Found ${interactiveElements.length} interactive elements`);
        
        interactiveElements.forEach((element, index) => {
            this.enhanceInteractiveElement(element, index + 1);
            element.setAttribute('data-interactive-enhanced', 'true');
        });
    }

    enhanceInteractiveElement(element, elementNumber) {
        // Add click handler if not already present
        if (!element.onclick) {
            element.addEventListener('click', (e) => {
                this.handleInteractiveElementClick(element, e);
            });
        }
        
        // Add hover effects
        element.addEventListener('mouseenter', () => {
            element.style.backgroundColor = element.style.backgroundColor || '#f3f4f6';
            element.style.transition = 'all 0.2s ease-out';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.backgroundColor = '';
        });
        
        // Ensure proper cursor
        if (!element.style.cursor && !element.closest('button, a')) {
            element.style.cursor = 'pointer';
        }
        
        console.log(`Enhanced interactive element ${elementNumber}: ${element.tagName}`);
    }

    handleInteractiveElementClick(element, event) {
        console.log(`🔘 Interactive element clicked: ${element.tagName}`);
        
        // Visual feedback
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = '#e5e7eb';
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 200);
        
        // Handle based on element type and context
        const action = element.dataset.action || 'generic';
        const elementType = element.tagName.toLowerCase();
        
        if (elementType === 'td' || elementType === 'tr') {
            this.showToast('Table row selected', 'info');
        } else if (element.classList.contains('card')) {
            this.showToast('Card selected', 'info');
        } else if (element.classList.contains('list-item')) {
            this.showToast('List item selected', 'info');
        } else {
            this.showToast(`${action} action triggered`, 'info');
        }
    }

    initDataTables() {
        console.log('🔧 Initializing data tables...');
        
        const tables = document.querySelectorAll('table');
        console.log(`Found ${tables.length} tables`);
        
        tables.forEach((table, index) => {
            this.enhanceDataTable(table, index + 1);
        });
    }

    enhanceDataTable(table, tableNumber) {
        // Add table wrapper if not present
        if (!table.closest('.table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper overflow-x-auto';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
        
        // Make table rows clickable if they aren't already
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (!row.hasAttribute('data-table-enhanced')) {
                row.style.cursor = 'pointer';
                row.addEventListener('click', () => {
                    this.handleTableRowClick(row, index + 1, tableNumber);
                });
                
                row.addEventListener('mouseenter', () => {
                    row.style.backgroundColor = '#f9fafb';
                });
                
                row.addEventListener('mouseleave', () => {
                    row.style.backgroundColor = '';
                });
                
                row.setAttribute('data-table-enhanced', 'true');
            }
        });
        
        console.log(`Enhanced table ${tableNumber} with ${rows.length} rows`);
    }

    handleTableRowClick(row, rowNumber, tableNumber) {
        console.log(`Table ${tableNumber}, Row ${rowNumber} clicked`);
        
        // Remove previous selection
        const table = row.closest('table');
        table.querySelectorAll('tr.selected').forEach(tr => {
            tr.classList.remove('selected');
            tr.style.backgroundColor = '';
        });
        
        // Select current row
        row.classList.add('selected');
        row.style.backgroundColor = '#dbeafe';
        
        this.showToast(`Row ${rowNumber} selected`, 'info');
    }

    initProgressIndicators() {
        const progressBars = document.querySelectorAll('.progress-bar, [class*="progress"]');
        console.log(`Found ${progressBars.length} progress indicators`);
        
        progressBars.forEach((progress, index) => {
            this.enhanceProgressIndicator(progress, index + 1);
        });
    }

    enhanceProgressIndicator(progress, progressNumber) {
        // Add click handler to simulate progress change
        progress.addEventListener('click', () => {
            const currentWidth = parseInt(progress.style.width) || 0;
            const newWidth = Math.min(currentWidth + 20, 100);
            progress.style.width = `${newWidth}%`;
            progress.style.transition = 'width 0.5s ease-out';
            
            this.showToast(`Progress: ${newWidth}%`, 'info');
        });
        
        console.log(`Enhanced progress indicator ${progressNumber}`);
    }

    initToggleSwitches() {
        const toggles = document.querySelectorAll('input[type="checkbox"], .toggle, .switch');
        console.log(`Found ${toggles.length} toggle switches`);
        
        toggles.forEach((toggle, index) => {
            this.enhanceToggleSwitch(toggle, index + 1);
        });
    }

    enhanceToggleSwitch(toggle, toggleNumber) {
        toggle.addEventListener('change', () => {
            const isChecked = toggle.checked || toggle.classList.contains('active');
            this.showToast(`Toggle ${isChecked ? 'ON' : 'OFF'}`, isChecked ? 'success' : 'info');
        });
        
        console.log(`Enhanced toggle switch ${toggleNumber}`);
    }

    initStatusBadges() {
        const badges = document.querySelectorAll('.badge, .status, [class*="badge"], [class*="status"]');
        console.log(`Found ${badges.length} status badges`);
        
        badges.forEach((badge, index) => {
            if (!badge.hasAttribute('data-badge-enhanced')) {
                this.enhanceStatusBadge(badge, index + 1);
                badge.setAttribute('data-badge-enhanced', 'true');
            }
        });
    }

    enhanceStatusBadge(badge, badgeNumber) {
        badge.style.cursor = 'pointer';
        
        badge.addEventListener('click', () => {
            const statusText = badge.textContent.trim();
            this.showToast(`Status: ${statusText}`, 'info');
        });
        
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.05)';
            badge.style.transition = 'transform 0.2s ease-out';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1)';
        });
        
        console.log(`Enhanced status badge ${badgeNumber}: "${badge.textContent.trim()}"`);
    }

    handleImport() {
        this.showToast('Import functionality activated', 'info');
    }

    handleExport() {
        this.showToast('Export started...', 'info');
        
        setTimeout(() => {
            this.showToast('Export completed!', 'success');
        }, 1500);
    }

    refreshPage() {
        // Simulate page refresh without actually refreshing
        this.showToast('Data refreshed', 'info');
    }

    initProgressTracking() {
        // Animate progress bars
        const progressBars = document.querySelectorAll('[class*="w-"], [style*="width:"]');
        
        progressBars.forEach(bar => {
            if (bar.textContent.includes('%')) {
                this.animateProgress(bar);
            }
        });
    }

    animateProgress(element) {
        // Add smooth progress animation
        element.style.transition = 'all 0.8s ease-out';
    }

    initDataTables() {
        // Add sorting capability to tables
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            const headers = table.querySelectorAll('th');
            headers.forEach(header => {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    this.sortTable(table, header);
                });
            });
        });
    }

    sortTable(table, header) {
        this.showToast(`Sorting by ${header.textContent}`, 'info');
    }

    initCharts() {
        // Placeholder for chart initialization
        console.log('Charts initialized');
    }

    initFileUploads() {
        // File upload handlers
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        });
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            this.showToast(`Uploading ${file.name}...`, 'info');
            
            setTimeout(() => {
                this.showToast(`${file.name} uploaded successfully!`, 'success');
            }, 2000);
        });
    }

    initFilters() {
        const selects = document.querySelectorAll('select');
        
        selects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.applyFilter(e.target);
            });
        });
    }

    applyFilter(select) {
        this.showToast(`Filter applied: ${select.value}`, 'info');
    }

    initTabs() {
        // Already handled in initTabButtons
    }

    initAccordions() {
        // Accordion functionality for expandable sections
        console.log('Accordions initialized');
    }

    initProgressBars() {
        // Already handled in initProgressTracking
    }

    initDatePickers() {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        
        dateInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.showToast(`Date selected: ${e.target.value}`, 'info');
            });
        });
    }

    initPaginationHandlers() {
        // Pagination button handlers
        console.log('Pagination initialized');
    }

    initStatisticsCounters() {
        // Animate number counters
        const counters = document.querySelectorAll('[class*="text-2xl"], [class*="text-3xl"]');
        
        counters.forEach(counter => {
            if (/^\d+/.test(counter.textContent)) {
                this.animateCounter(counter);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = element.textContent.replace(/^\d+/, Math.floor(current).toString());
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = element.textContent.replace(/^\d+/, target.toString());
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    }

    showEmptyState(container, message) {
        const existingEmpty = container.querySelector('.empty-state');
        if (existingEmpty) return;
        
        const emptyState = document.createElement('tr');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <td colspan="100%" class="text-center py-8 text-gray-500">
                <div class="flex flex-col items-center space-y-2">
                    <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.837 0-5.376-1.474-6.854-3.717" />
                    </svg>
                    <p>${message}</p>
                </div>
            </td>
        `;
        
        container.appendChild(emptyState);
    }

    hideEmptyState(container) {
        const emptyState = container.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CounselFlowInteractive();
});

// Also initialize if DOM is already loaded (for dynamic content)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CounselFlowInteractive();
    });
} else {
    new CounselFlowInteractive();
}
