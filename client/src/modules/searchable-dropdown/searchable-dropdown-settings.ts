export class SearchableDropdownSettings{
    width?: number;
    searchable?: boolean;
    image?: boolean;
    imageWidth?: number;
    imageHeight?: number;
    placeholder?: string;
    searchBoxPlaceholder?: string;
    searchCaseSensitive?: boolean;
    constructor(
        _width?: number,
        _searchable?: boolean,
        _image?: boolean,
        _imageWidth?: number,
        _imageHeight?: number,
        _placeholder?: string,
        _searchBoxPlaceholder?: string,
        _searchCaseSensitive?: boolean,)
    {
        this.setDefaults();
        if(_width != null)
        {
            this.width = _width;
        }
        if(_searchable != null)
        {
            this.searchable = _searchable;
        }
        if(_image != null)
        {
            this.image = _image;
        }
        if(_imageWidth != null)
        {
            this.imageWidth = _imageWidth;
        }
        if(_imageHeight != null)
        {
            this.imageHeight = _imageHeight;
        }
        if(_placeholder != null)
        {
            this.placeholder = _placeholder;
        }
        if(_searchBoxPlaceholder != null)
        {
            this.searchBoxPlaceholder = _searchBoxPlaceholder;
        }
        if(_searchCaseSensitive != null)
        {
            this.searchCaseSensitive = _searchCaseSensitive;
        }
    }

    setSettings(instance: SearchableDropdownSettings)
    {
        if(instance.searchable != null)
        {
            this.searchable = instance.searchable;
        }
        if(instance.image != null)
        {
            this.image = instance.image;
        }
        if(instance.imageWidth != null)
        {
            this.imageWidth = instance.imageWidth;
        }
        if(instance.imageHeight != null)
        {
            this.imageHeight = instance.imageHeight;
        }
        if(instance.placeholder != null)
        {
            this.placeholder = instance.placeholder;
        }
        if(instance.searchBoxPlaceholder != null)
        {
            this.searchBoxPlaceholder = instance.searchBoxPlaceholder;
        }
        if(instance.searchCaseSensitive != null)
        {
            this.searchCaseSensitive = instance.searchCaseSensitive;
        }
    }

    setDefaults(instance?: SearchableDropdownSettings)
    {
        this.width = 160;
        this.searchable = false;
        this.image = false;
        this.imageWidth = 32;
        this.imageHeight = 32;
        this.placeholder = "Select an option";
        this.searchBoxPlaceholder = "Search";
        this.searchCaseSensitive = false;
    }
}