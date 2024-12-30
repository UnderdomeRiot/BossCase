import type { DependencyContainer } from "tsyringe";
import type { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import type { DatabaseServer } from "@spt/servers/DatabaseServer";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import type { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";

import cases from "../config/config.json";

const RAGMAN_ID = "5ac3b934156ae10c4430e83c";
const ROUBLES_ID = "5449016a4bdc2d6f028b456f";

const conflictingItemsPipe: string[] = [
    //"5c0e842486f77443a74d2976",
    "5c0919b50db834001b7ce3b9",
    "5ea058e01dbce517f324b3e2",
    "5f60c076f2bcbb675b00dac2",
    "5a16ba61fcdbcb098008728a",
    "6570a88c8f221f3b210353b7"
]

const conflictingItemsUbey: string[] = [
    "59e770f986f7742cbe3164ef",
    "572b7d8524597762b472f9d1",
    "5aa2b87de5b5b00016327c25",
    "5aa2a7e8e5b5b00016327c16",
    "5a43943586f77416ad2f06e2",
    "5aa2b89be5b5b0001569311f",
    "5aa2b8d7e5b5b00014028f4a",
    "5a43957686f7742a2c2f11b0",
    "5aa2b9ede5b5b000137b758b",
    "5ab8f20c86f7745cdb629fb2",
    "5645bc214bdc2d363b8b4571",
    "5aa7cfc0e5b5b00015693143",
    "5aa7e276e5b5b000171d0647",
    "5c066ef40db834001966a595",
    "5df8a58286f77412631087ed",
    "59e7711e86f7746cae05fbe1",
    "5d5e7d28a4b936645d161203",
    "5d5e9c74a4b9364855191c40",
    "5a154d5cfcdbcb001a3b00da",
    "5ac8d6885acfc400180ae7b0",
    "5a7c4850e899ef00150be885",
    "5aa7d193e5b5b000171d063f",
    "5aa7d03ae5b5b00016327db5",
    "5a16bb52fcdbcb001a3b00dc",
    "5aa7e454e5b5b0214e506fa2",
    "5aa7e4a4e5b5b000137b76f2",
    "5f99418230835532b445e954",
    "5b4329f05acfc47a86086aa1",
    "5b40e5e25acfc4001a599bea",
    "5f60e6403b85f6263c14558c",
    "5f60e7788adaa7100c3adb49",
    "5f60e784f2bcbb675b00dac7",
    "60bf74184a63fc79b60c57f6",
    "5d96141523f0ea1b7f2aacab",
    "603618feffd42c541047f771",
    "603619720ca681766b6a0fc4",
    "6040de02647ad86262233012",
    "60361a7497633951dc245eb4",
    "60361b0b5a45383c122086a1",
    "60361b5a9a15b10d96792291",
    "5b4327aa5acfc400175496e0",
    "618aef6d0a5a59657e5f55ee",
    "60b52e5bc7d8103275739d67",
    "5b4329075acfc400153b78ff",
    "5f994730c91ed922dd355de3",
    "5b40e61f5acfc4001a599bec",
    "5b40e3f35acfc40016388218",
    "5b40e4035acfc47a87740943",
    "5b432d215acfc4771e1c6624",
    "5b40e1525acfc4771e1c6611",
    "5b40e2bc5acfc40016388216",
    "5c17a7ed2e2216152142459c",
    "5ea17ca01412a1425304d1c0",
    "5f60b34a41e30a4ab12a6947",
    "5ea05cf85ad9772e6624305d",
    "5d6d3716a4b9361bc8618872",
    "5c091a4e0db834001d5addc8",
    //"5c0e874186f7745dc7616606",
    "61bca7cda0eae612383adf57",
    "5c0d2727d174af02a012cf58",
    "5f60c74e3b85f6263c145586",
    "5c08f87c0db8340019124324",
    "5c06c6a80db834001b735491",
    "5e4bfc1586f774264f7582d3",
    "5e00c1ad86f774747333222c",
    "5e01ef6886f77445f643baa4",
    "5ca20ee186f774799474abc2",
    "59ef13ca86f77445fd0e2483",
    "59e7708286f7742cbd762753",
    "65719f0775149d62ce0a670b",
    "65709d2d21b9f815e208ff95",
    "65749cb8e0423b9ebe0c79c9",
    "65749ccf33fdc9c0cf06d3ca",
    "66bdc28a0b603c26902b2011",
    "66b5f65ca7f72d197e70bcd6",
    "66b5f666cad6f002ab7214c2",
    "66b5f661af44ca0014063c05"
];

const conflictingItemsGorilla: string[] = [
    "59e770f986f7742cbe3164ef",
    "572b7d8524597762b472f9d1",
    "5aa2b87de5b5b00016327c25",
    "5aa2a7e8e5b5b00016327c16",
    "5a43943586f77416ad2f06e2",
    "5aa2b89be5b5b0001569311f",
    "5aa2b8d7e5b5b00014028f4a",
    "5a43957686f7742a2c2f11b0",
    "5aa2b9ede5b5b000137b758b",
    "5ab8f20c86f7745cdb629fb2",
    "5645bc214bdc2d363b8b4571",
    "5aa7cfc0e5b5b00015693143",
    "5aa7e276e5b5b000171d0647",
    "5c066ef40db834001966a595",
    "5df8a58286f77412631087ed",
    "59e7711e86f7746cae05fbe1",
    "5d5e7d28a4b936645d161203",
    "5d5e9c74a4b9364855191c40",
    "5a154d5cfcdbcb001a3b00da",
    "5ac8d6885acfc400180ae7b0",
    "5a7c4850e899ef00150be885",
    "5aa7d193e5b5b000171d063f",
    "5aa7d03ae5b5b00016327db5",
    "5a16bb52fcdbcb001a3b00dc",
    "5aa7e454e5b5b0214e506fa2",
    "5aa7e4a4e5b5b000137b76f2",
    "5f99418230835532b445e954",
    "5b4329f05acfc47a86086aa1",
    "5b40e5e25acfc4001a599bea",
    "5f60e6403b85f6263c14558c",
    "5f60e7788adaa7100c3adb49",
    "5f60e784f2bcbb675b00dac7",
    "60bf74184a63fc79b60c57f6",
    "5d96141523f0ea1b7f2aacab",
    "603618feffd42c541047f771",
    "603619720ca681766b6a0fc4",
    "6040de02647ad86262233012",
    "60361a7497633951dc245eb4",
    "60361b0b5a45383c122086a1",
    "60361b5a9a15b10d96792291",
    "5b4327aa5acfc400175496e0",
    "618aef6d0a5a59657e5f55ee",
    "60b52e5bc7d8103275739d67",
    "5b4329075acfc400153b78ff",
    "5f994730c91ed922dd355de3",
    "5b40e61f5acfc4001a599bec",
    "5b40e3f35acfc40016388218",
    "5b40e4035acfc47a87740943",
    "5b432d215acfc4771e1c6624",
    "5b40e1525acfc4771e1c6611",
    "5b40e2bc5acfc40016388216",
    "5c17a7ed2e2216152142459c",
    "5ea17ca01412a1425304d1c0",
    "5f60b34a41e30a4ab12a6947",
    "5ea05cf85ad9772e6624305d",
    "5d6d3716a4b9361bc8618872",
    "5c091a4e0db834001d5addc8",
    //"5c0e874186f7745dc7616606",
    "61bca7cda0eae612383adf57",
    "5c0d2727d174af02a012cf58",
    "5f60c74e3b85f6263c145586",
    "5c08f87c0db8340019124324",
    "5c06c6a80db834001b735491",
    "5e4bfc1586f774264f7582d3",
    "5e00c1ad86f774747333222c",
    "5e01ef6886f77445f643baa4",
    "5ca20ee186f774799474abc2",
    "59ef13ca86f77445fd0e2483",
    "59e7708286f7742cbd762753",
    "65719f0775149d62ce0a670b",
    "65709d2d21b9f815e208ff95",
    "65749cb8e0423b9ebe0c79c9",
    "65749ccf33fdc9c0cf06d3ca",
    "66bdc28a0b603c26902b2011",
    "66b5f65ca7f72d197e70bcd6",
    "66b5f666cad6f002ab7214c2",
    "66b5f661af44ca0014063c05"
];


interface ItemModification {
    id: string;
    modify: (item: ITemplateItem) => void;
}

class Mod implements IPostDBLoadMod {
    private static readonly CASE_ID_MAP = {
        BossCase: "3a9fb27415d6a32fd4c981ac"
    };

    private readonly modName = "BossCase";
    private container: DependencyContainer;
    private logger: ILogger;

    public postDBLoad(container: DependencyContainer): void {
        this.container = container;
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.log(`[${this.modName}] : Mod loading`, LogTextColor.WHITE);

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();
        
        Object.values(cases).forEach(caseConfig => {
            // Skip if trader is not Ragman
            if (caseConfig.trader !== "ragman") return;
            this.createCase(caseConfig, tables);
        });

        this.solveSpecificIncompatibilities(tables);

    }

    private static readonly ITEM_MODIFICATIONS: ItemModification[] = [
        {
            id: "60a7ad2a2198820d95707a2e", // Tagilla's welding mask "UBEY"
            modify: (item) => {
                item._props.ConflictingItems = conflictingItemsUbey;
            }
        },
        {
            id: "60a7ad3a0c5cb24b0134664a", // Tagilla's welding mask "Gorilla" 
            modify: (item) => {
                item._props.ConflictingItems = conflictingItemsGorilla;
            }
        },       
        {
            id: "62a61bbf8ec41a51b34758d2", // Big Pipe's smoking pipe
            modify: (item) => {
                item._props.ConflictingItems = conflictingItemsPipe;
            }
        }
    ];

    private solveSpecificIncompatibilities(tables: any): void {
        const itemDB = tables.templates.items;
        
        const modificationMap = new Map(
            Mod.ITEM_MODIFICATIONS.map(mod => [mod.id, mod.modify])
        );

        Object.values(itemDB).forEach(item => {
            const modifier = modificationMap.get(item._id);
            if (modifier) {
                modifier(item);
            }
        });
    }

    private createCase(caseConfig: any, tables: any): void {
        const templateId = Mod.CASE_ID_MAP[caseConfig.id];
        if (!templateId) return;

        const item = this.createBaseItem(caseConfig, tables.templates.items);
        item._id = templateId;
        item._props.Prefab.path = "BossCase/case.bundle";

        if (caseConfig.case_type === "slots") {
            item._props.Slots = this.createSlots(caseConfig.slot_ids);
        }

        // Update item properties
        Object.assign(item._props, {
            Width: caseConfig.ExternalSize.width,
            Height: caseConfig.ExternalSize.height,
            CanSellOnRagfair: !caseConfig.flea_banned,
            InsuranceDisabled: !caseConfig.insurance_enabled
        });

        // Update tables
        tables.templates.items[templateId] = item;
        this.updateLocales(templateId, caseConfig, tables.locales.global);
        this.updateHandbook(templateId, caseConfig.flea_price, tables.templates.handbook);
        this.updateContainerPermissions(templateId, caseConfig, tables.templates.items);
        this.addToTrader(templateId, caseConfig, tables.traders[RAGMAN_ID]);
    }

    private createBaseItem(config: any, items: any): any {
        if (config.case_type === "slots") {
            const baseItem = structuredClone(items["5a9d6d00a2750c5c985b5305"]);
            baseItem._props.IsAlwaysAvailableForInsurance = true;
            baseItem._props.DiscardLimit = -1;
            baseItem._props.ItemSound = config.sound;
            //baseItem._props.MergesWithChildren = false;
            //baseItem._props.NotShownInSlot = false;
            return baseItem;
        }
        return {};
    }

    private createSlots(slotIds: string[]): any[] {
        return slotIds.map((slotId, index) => ({
            _name: `mod_mount_${index}`,
            _id: this.container.resolve<any>("HashUtil").generate(),
            _parent: Mod.CASE_ID_MAP.BossCase,
            _props: {
                filters: [{
                    Filter: [slotId],
                    ExcludedFilter: []
                }],
                _required: false,
                _mergeSlotWithChildren: false
            }
        }));
    }

    private updateLocales(templateId: string, config: any, locales: Record<string, Record<string, string>>): void {
        Object.values(locales).forEach(locale => {
            locale[`${templateId} Name`] = config.item_name;
            locale[`${templateId} ShortName`] = config.item_short_name;
            locale[`${templateId} Description`] = config.item_description;
        });
    }

    private updateHandbook(templateId: string, price: number, handbook: any): void {
        handbook.Items.push({
            Id: templateId,
            ParentId: "5b5f6fa186f77409407a7eb7",
            Price: price
        });
    }

    private updateContainerPermissions(
        itemId: string, 
        config: any, 
        items: Record<string, ITemplateItem>
    ): void {
        Object.values(items).forEach(item => {
            if (item._type !== "Item") return;

            if (config.allow_in_secure_containers && item._parent === BaseClasses.MOB_CONTAINER) {
                this.updateFilters(item, itemId, true);
            }

            if (config.case_allowed_in?.includes(item._id)) {
                this.updateFilters(item, itemId, true);
            }
        });
    }

    private updateFilters(item: ITemplateItem, itemId: string, isInclude: boolean): void {
        if (!item._props.Grids) return;
        
        item._props.Grids.forEach(grid => {
            const filterArray = isInclude ? 'Filter' : 'ExcludedFilter';
            if (!grid._props.filters[0]) {
                grid._props.filters[0] = { Filter: [], ExcludedFilter: [] };
            }
            if (!grid._props.filters[0][filterArray]) {
                grid._props.filters[0][filterArray] = [];
            }
            if (!grid._props.filters[0][filterArray].includes(itemId)) {
                grid._props.filters[0][filterArray].push(itemId);
            }
        });
    }

    private addToTrader(templateId: string, config: any, trader: any): void {
        if (!trader) {
            this.logger.error(`[${this.modName}] : Could not find Ragman trader`);
            return;
        }

        trader.assort.items.push({
            _id: templateId,
            _tpl: templateId,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: config.unlimited_stock,
                StackObjectsCount: config.stock_amount
            }
        });

        trader.assort.barter_scheme[templateId] = [[{
            count: config.price,
            _tpl: ROUBLES_ID
        }]];

        trader.assort.loyal_level_items[templateId] = config.trader_loyalty_level;
    }
}

module.exports = { mod: new Mod() };